import { adminUser, json, sameOrigin } from '../../../../lib/admin';
import { database, STATUSES } from '../../../../lib/records';
export async function GET(request: Request) {
  if (!await adminUser()) return json({ error: 'Please sign in again.' }, 401);
  const params = new URL(request.url).searchParams;
  const page = Math.max(0, Math.min(Number(params.get('page')) || 0, 100000));
  const query = new URLSearchParams({ select: '*', order: 'created_at.desc,id.desc', limit: '30', offset: String(Math.floor(page) * 30) });
  const kind = params.get('kind'), status = params.get('status'), q = params.get('q')?.replace(/[^\p{L}\p{N}@+ ._-]/gu, '').slice(0, 100);
  if (kind && ['appointment','contact','referral','planner'].includes(kind)) query.set('kind', `eq.${kind}`);
  if (status && STATUSES.includes(status as typeof STATUSES[number])) query.set('status', `eq.${status}`);
  // Use quoted PostgREST values; characters capable of escaping filter syntax are removed.
  if (q) query.set('or', `(name.ilike."*${q}*",email.ilike."*${q}*",phone.ilike."*${q}*")`);
  const from = params.get('from'), to = params.get('to');
  if (from && /^\d{4}-\d{2}-\d{2}$/.test(from)) query.append('created_at', `gte.${from}T00:00:00+01:00`);
  if (to && /^\d{4}-\d{2}-\d{2}$/.test(to)) query.append('created_at', `lte.${to}T23:59:59.999+01:00`);
  try { const r = await database(`kp_main_enquiries?${query}`, { headers: { Prefer: 'count=exact' } }); return json({ records: await r.json(), total: Number(r.headers.get('content-range')?.split('/')[1]) || 0 }); }
  catch { return json({ error: 'Records are unavailable. Check the database connection and migration. Existing emails continue unchanged.' }, 503); }
}
export async function PATCH(request: Request) {
  if (!sameOrigin(request)) return json({ error: 'Invalid request origin.' }, 403);
  const user = await adminUser(); if (!user) return json({ error: 'Please sign in again.' }, 401);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid request.' }, 400); }
  if (!/^[0-9a-f-]{36}$/i.test(body.id || '') || !STATUSES.includes(body.status) || typeof body.notes !== 'string' || body.notes.length > 5000 || (body.follow_up && !/^\d{4}-\d{2}-\d{2}$/.test(body.follow_up))) return json({ error: 'Check the follow-up details.' }, 400);
  try {
    const r = await database('rpc/kp_main_update_enquiry', { method: 'POST', body: JSON.stringify({ record_id: body.id, new_status: body.status, new_notes: body.notes, new_follow_up: body.follow_up || null, actor: user.id }) });
    const data = await r.json(); if (!data) return json({ error: 'Record not found.' }, 404); return json({ ok: true });
  } catch { return json({ error: 'The change was not saved. Please try again.' }, 503); }
}
