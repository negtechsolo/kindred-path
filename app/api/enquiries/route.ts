import { POST as sendExistingEmail } from './email-delivery';
import { saveEnquiry, saveDelivery } from '../../../lib/records';

// The original email implementation is preserved byte-for-byte in email-delivery.ts.
// Storage is independent: a database outage must not prevent the existing email send.
export async function POST(request: Request) {
  let body: Record<string, unknown> | null = null;
  try { body = await request.clone().json(); } catch { /* Original handler owns validation. */ }
  const recording = body && typeof body === 'object' ? saveEnquiry(body) : Promise.resolve(null);
  try {
    const response = await sendExistingEmail(request);
    const id = await recording;
    await saveDelivery(id, response.ok ? 'accepted' : response.status === 503 ? 'not_configured' : 'failed');
    return response;
  } catch (error) {
    await saveDelivery(await recording, 'unknown');
    throw error;
  }
}
