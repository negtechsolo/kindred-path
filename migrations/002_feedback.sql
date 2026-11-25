-- Run AFTER 001_main_website_dashboard.sql. Additive; existing mail code is unchanged.
begin;
create table if not exists public.kp_main_feedback_invites (
 id uuid primary key default gen_random_uuid(), token uuid not null unique default gen_random_uuid(),
 enquiry_id uuid not null references public.kp_main_enquiries(id), kind text not null check(kind in ('registration','visit')),
 due_at timestamptz not null, expires_at timestamptz not null, status text not null default 'pending' check(status in ('pending','sending','sent','failed','responded','skipped')),
 claimed_at timestamptz, sent_at timestamptz, unique(enquiry_id,kind)
);
create table if not exists public.kp_main_feedback (
 id uuid primary key default gen_random_uuid(), created_at timestamptz not null default now(),
 kind text not null check(kind in ('registration','visit')), anonymous boolean not null default false,
 enquiry_id uuid references public.kp_main_enquiries(id), invitation_id uuid unique references public.kp_main_feedback_invites(id),
 answers jsonb not null, status text not null default 'new' check(status in ('new','reviewed','follow_up','closed')), notes text not null default '',
 submission_id uuid not null unique,
 check(not anonymous or (enquiry_id is null and invitation_id is null))
);
create table if not exists public.kp_main_attendance (enquiry_id uuid primary key references public.kp_main_enquiries(id), visited_on date not null, actor uuid not null, created_at timestamptz not null default now());
alter table public.kp_main_feedback add column if not exists notified_at timestamptz;
create index if not exists kp_feedback_created on public.kp_main_feedback(created_at desc);
alter table public.kp_main_feedback enable row level security;
alter table public.kp_main_feedback_invites enable row level security;
alter table public.kp_main_attendance enable row level security;
revoke all on public.kp_main_feedback,public.kp_main_feedback_invites,public.kp_main_attendance from anon,authenticated;
grant all on public.kp_main_feedback,public.kp_main_feedback_invites,public.kp_main_attendance to service_role;
create or replace function public.kp_main_queue_registration_feedback() returns trigger language plpgsql security invoker set search_path=public as $$
begin
 if new.kind in ('appointment','contact') and new.consent and new.source='website' and new.email<>'' then
 insert into kp_main_feedback_invites(enquiry_id,kind,due_at,expires_at) values(new.id,'registration',new.created_at+interval '5 days',new.created_at+interval '35 days') on conflict do nothing;
 end if;return new;
end $$;
drop trigger if exists kp_queue_registration_feedback on public.kp_main_enquiries;
create trigger kp_queue_registration_feedback after insert on public.kp_main_enquiries for each row execute function public.kp_main_queue_registration_feedback();
create or replace function public.kp_main_attended(record_id uuid,visit_date date,actor_id uuid) returns void language plpgsql security invoker set search_path=public as $$
begin
 if visit_date>current_date or visit_date is null then raise exception 'Invalid date';end if;
 if not exists(select 1 from kp_main_enquiries where id=record_id and kind='appointment') then raise exception 'Appointment not found';end if;
 insert into kp_main_attendance(enquiry_id,visited_on,actor) values(record_id,visit_date,actor_id) on conflict(enquiry_id) do update set visited_on=excluded.visited_on;
 insert into kp_main_feedback_invites(enquiry_id,kind,due_at,expires_at) select record_id,'visit',greatest(((visit_date+time '10:00') at time zone 'Africa/Lagos')+interval '5 days',now()),greatest(((visit_date+time '10:00') at time zone 'Africa/Lagos')+interval '35 days',now()+interval '30 days') where exists(select 1 from kp_main_enquiries where id=record_id and email<>'' and consent)
 on conflict(enquiry_id,kind) do update set due_at=excluded.due_at,expires_at=excluded.expires_at where kp_main_feedback_invites.status='pending';
 insert into kp_main_audit(enquiry_id,actor,action) values(record_id,actor_id,'Marked attended; visit feedback queued if email provided');
end $$;
create or replace function public.kp_main_claim_feedback() returns setof public.kp_main_feedback_invites language plpgsql security invoker set search_path=public as $$
begin
 update kp_main_feedback_invites set status='failed' where status='sending' and claimed_at<now()-interval '20 minutes';
 -- Uncertain deliveries are not automatically retried. Resend dashboard supports reconciliation.
 return query with picked as (select i.id from kp_main_feedback_invites i where i.status='pending' and i.due_at<=now() and i.expires_at>now()
 and not exists(select 1 from kp_main_feedback_invites other where other.enquiry_id=i.enquiry_id and other.id<>i.id and (other.sent_at>now()-interval '3 days' or other.status='sending' or (other.status='pending' and other.due_at<=now() and other.expires_at>now() and (other.due_at,other.id)<(i.due_at,i.id)))) order by i.due_at limit 10 for update skip locked)
 update kp_main_feedback_invites i set status='sending',claimed_at=now() from picked where i.id=picked.id returning i.*;
end $$;
create or replace function public.kp_main_submit_feedback(payload jsonb,rate_key text) returns uuid language plpgsql security invoker set search_path=public as $$
declare inv kp_main_feedback_invites; result uuid; hits integer;
begin
 insert into kp_main_rate_limits(key) values(rate_key) on conflict(key) do update set count=kp_main_rate_limits.count+1 returning count into hits;
 if hits>15 then raise exception 'Rate limit';end if;
 delete from kp_main_rate_limits where created_at<now()-interval '2 hours';
 select id into result from kp_main_feedback where submission_id=(payload->>'submission_id')::uuid; if found then return result;end if;
 if payload->>'token' is not null and not (payload->>'anonymous')::boolean then
 select * into inv from kp_main_feedback_invites where token=(payload->>'token')::uuid and kind=payload->>'kind' and expires_at>now() for update;
 if not found or inv.status='responded' then raise exception 'Invalid or used invitation';end if;
 end if;
 insert into kp_main_feedback(kind,anonymous,enquiry_id,invitation_id,answers,submission_id) values(payload->>'kind',(payload->>'anonymous')::boolean,inv.enquiry_id,inv.id,payload->'answers',(payload->>'submission_id')::uuid) returning id into result;
 if inv.id is not null then update kp_main_feedback_invites set status='responded' where id=inv.id;end if;
 return result;
end $$;
revoke all on function public.kp_main_queue_registration_feedback(),public.kp_main_attended(uuid,date,uuid),public.kp_main_claim_feedback(),public.kp_main_submit_feedback(jsonb,text) from public,anon,authenticated;
grant execute on function public.kp_main_queue_registration_feedback(),public.kp_main_attended(uuid,date,uuid),public.kp_main_claim_feedback(),public.kp_main_submit_feedback(jsonb,text) to service_role;
commit;
