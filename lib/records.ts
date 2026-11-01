export type Enquiry = {
  id: string; created_at: string; kind: string; name: string; phone: string; email: string;
  fields: Record<string, string>; delivery: string; status: string; notes: string;
  follow_up: string | null; updated_at: string; source: string;
};
export const STATUSES = ['new', 'contacted', 'scheduled', 'closed'] as const;
export function databaseConfigured() { return !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY); }
export async function database(path: string, init: RequestInit = {}) {
  if (!databaseConfigured()) throw new Error('Database is not configured');
  const response = await fetch(`${process.env.SUPABASE_URL!.replace(/\/$/, '')}/rest/v1/${path}`, {
    ...init, headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`, 'Content-Type': 'application/json', ...init.headers },
    cache: 'no-store', signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error('Database request failed');
  return response;
}
const clean = (value: unknown, max = 500) => String(value ?? '').trim().slice(0, max);
export function recordFrom(body: Record<string, unknown>) {
  if (clean(body.website) || !clean(body.name, 100) || !clean(body.phone, 50) || body.consent !== true) return null;
  const type = clean(body.type, 80);
  const kind = type.startsWith('CONSULTANT REFERRAL') ? 'referral' : type === 'cost-planner' ? 'planner' : type.startsWith('appointment') ? 'appointment' : 'contact';
  const fields: Record<string, string> = {};
  for (const [key, length] of Object.entries({ type: 80, service: 120, mode: 80, day: 30, time: 30, attending: 60, history: 60, message: 3500 })) fields[key] = clean(body[key], length);
  return { kind, name: clean(body.name, 100), phone: clean(body.phone, 50), email: clean(body.email, 150), fields, consent: true, source: 'website' };
}
export async function saveEnquiry(body: Record<string, unknown>) {
  const record = recordFrom(body);
  if (!record) return null;
  try {
    const r = await database('kp_main_enquiries?select=id', { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify(record) });
    const data = await r.json(); return data[0].id as string;
  } catch { console.error('Kindred Path enquiry recording unavailable; existing email delivery continues.'); return null; }
}
export async function saveDelivery(id: string | null, delivery: string) {
  if (!id) return;
  try { await database(`kp_main_enquiries?id=eq.${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify({ delivery }) }); }
  catch { console.error('Kindred Path delivery status recording unavailable.'); }
}
