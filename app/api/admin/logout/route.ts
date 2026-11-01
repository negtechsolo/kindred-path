import { cookies } from 'next/headers';
import { authConfig, json, sameOrigin, SESSION_COOKIE } from '../../../../lib/admin';
export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: 'Invalid request origin.' }, 403);
  const config = authConfig(), token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (config && token) { try { await fetch(`${config.url}/auth/v1/logout?scope=local`, { method: 'POST', headers: { apikey: config.key, Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(5000) }); } catch { /* Always clear the local session. */ } }
  const response = json({ ok: true }); response.cookies.set(SESSION_COOKIE, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: 0 }); return response;
}
