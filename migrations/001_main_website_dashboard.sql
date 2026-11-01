-- Main website only. Additive and independent of the fertility campaign tables.
-- Run in Supabase SQL Editor. Never expose the service-role key in the browser.
begin;
create table if not exists public.kp_main_enquiries (
  id uuid primary key default gen_random_uuid(), created_at timestamptz not null default now(),
  kind text not null check (kind in ('appointment','contact','referral','planner')),
  name text not null, phone text not null, email text not null default '', fields jsonb not null default '{}',
  consent boolean not null, source text not null default 'website',
  delivery text not null default 'pending' check (delivery in ('pending','accepted','failed','not_configured','unknown','historical')),
  status text not null default 'new' check (status in ('new','contacted','scheduled','closed')),
  notes text not null default '', follow_up date, updated_at timestamptz not null default now()
);
create index if not exists kp_main_enquiries_date on public.kp_main_enquiries(created_at desc);
create index if not exists kp_main_enquiries_followup on public.kp_main_enquiries(follow_up) where status <> 'closed';
create table if not exists public.kp_main_audit (
  id bigint generated always as identity primary key, created_at timestamptz not null default now(),
  enquiry_id uuid not null references public.kp_main_enquiries(id), actor uuid not null, action text not null
);
create table if not exists public.kp_main_activity (
  day date not null, event text not null, path text not null, referrer text not null default '', count bigint not null default 1,
  primary key(day,event,path,referrer)
);
create table if not exists public.kp_main_rate_limits (key text primary key, count integer not null default 1, created_at timestamptz not null default now());
alter table public.kp_main_enquiries enable row level security;
alter table public.kp_main_audit enable row level security;
alter table public.kp_main_activity enable row level security;
alter table public.kp_main_rate_limits enable row level security;
revoke all on public.kp_main_enquiries, public.kp_main_audit, public.kp_main_activity, public.kp_main_rate_limits from anon, authenticated;
grant all on public.kp_main_enquiries, public.kp_main_audit, public.kp_main_activity, public.kp_main_rate_limits to service_role;
grant usage, select on sequence public.kp_main_audit_id_seq to service_role;
create or replace function public.kp_main_update_enquiry(record_id uuid, new_status text, new_notes text, new_follow_up date, actor uuid)
returns boolean language plpgsql security invoker set search_path = public as $$
begin
 update kp_main_enquiries set status=new_status, notes=new_notes, follow_up=new_follow_up, updated_at=now() where id=record_id;
 if not found then return false; end if;
 insert into kp_main_audit(enquiry_id,actor,action) values(record_id,actor,'Updated follow-up');
 return true;
end $$;
create or replace function public.kp_main_track(event_name text,page_path text,referring_host text,rate_key text)
returns void language plpgsql security invoker set search_path = public as $$
declare hits integer;
begin
 if event_name not in ('page_view','campaign_book','campaign_ask','call_click','whatsapp_click','planner_download') then return; end if;
 insert into kp_main_rate_limits(key) values(rate_key) on conflict(key) do update set count=kp_main_rate_limits.count+1 returning count into hits;
 if hits>120 then return; end if;
 delete from kp_main_rate_limits where created_at < now()-interval '2 hours';
 insert into kp_main_activity(day,event,path,referrer) values((now() at time zone 'Africa/Lagos')::date,event_name,left(page_path,160),left(referring_host,150))
 on conflict(day,event,path,referrer) do update set count=kp_main_activity.count+1;
 -- Aggregate activity retained for 13 months. No visitor identifiers or form contents.
 delete from kp_main_activity where day < current_date - interval '13 months';
end $$;
create or replace function public.kp_main_overview()
returns jsonb language sql security invoker set search_path = public as $$
 select jsonb_build_object(
  'total',(select count(*) from kp_main_enquiries),
  'new',(select count(*) from kp_main_enquiries where status='new'),
  'followups',(select count(*) from kp_main_enquiries where status<>'closed' and follow_up<=(now() at time zone 'Africa/Lagos')::date),
  'emailIssues',(select count(*) from kp_main_enquiries where delivery in ('failed','not_configured','unknown') or (delivery='pending' and created_at<now()-interval '5 minutes')),
  'firstRecord',(select min(created_at) from kp_main_enquiries),
  'pageViews',(select coalesce(sum(count),0) from kp_main_activity where event='page_view' and day >= (now() at time zone 'Africa/Lagos')::date-29),
  'daily',coalesce((select jsonb_agg(t order by t.day) from (select day,sum(count) as count from kp_main_activity where event='page_view' and day>=(now() at time zone 'Africa/Lagos')::date-29 group by day) t),'[]'::jsonb),
  'pages',coalesce((select jsonb_agg(t) from (select path,sum(count) as count from kp_main_activity where event='page_view' and day>=(now() at time zone 'Africa/Lagos')::date-29 group by path order by count desc limit 8) t),'[]'::jsonb),
  'events',coalesce((select jsonb_agg(t) from (select event,sum(count) as count from kp_main_activity where event<>'page_view' and day>=(now() at time zone 'Africa/Lagos')::date-29 group by event order by count desc) t),'[]'::jsonb),
  'sources',coalesce((select jsonb_agg(t) from (select referrer,sum(count) as count from kp_main_activity where event='page_view' and day>=(now() at time zone 'Africa/Lagos')::date-29 group by referrer order by count desc limit 8) t),'[]'::jsonb)
 )
$$;
revoke all on function public.kp_main_update_enquiry(uuid,text,text,date,uuid), public.kp_main_track(text,text,text,text), public.kp_main_overview() from public, anon, authenticated;
grant execute on function public.kp_main_update_enquiry(uuid,text,text,date,uuid), public.kp_main_track(text,text,text,text), public.kp_main_overview() to service_role;
commit;
