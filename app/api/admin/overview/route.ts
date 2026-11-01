import { adminUser, json } from '../../../../lib/admin';
import { database } from '../../../../lib/records';
export async function GET() {
  if (!await adminUser()) return json({ error: 'Please sign in again.' }, 401);
  try { const r = await database('rpc/kp_main_overview', { method: 'POST', body: '{}' }); return json(await r.json()); }
  catch { return json({ error: 'Reporting is not connected. Apply the database migration and configure the server keys. Email sending is unaffected.' }, 503); }
}
