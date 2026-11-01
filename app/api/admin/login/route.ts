import { authConfig, json, sameOrigin, SESSION_COOKIE } from '../../../../lib/admin';
export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: 'Invalid request origin.' }, 403);
  const config = authConfig();
  if (!config) return json({ error: 'Private access has not been configured yet.' }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid request.' }, 400); }
  if (typeof body.email !== 'string' || typeof body.password !== 'string' || body.password.length > 512 || body.email.trim().toLowerCase() !== config.email) return json({ error: 'Unable to sign in with those details.' }, 401);
  try {
    const r = await fetch(`${config.url}/auth/v1/token?grant_type=password`, { method: 'POST', headers: { apikey: config.key, 'Content-Type': 'application/json' }, body: JSON.stringify({ email: body.email.trim(), password: body.password }), cache: 'no-store', signal: AbortSignal.timeout(10000) });
    if (r.status === 429) return json({ error: 'Too many attempts. Please wait before trying again.' }, 429);
    if (!r.ok) return json({ error: 'Unable to sign in with those details.' }, 401);
    const data = await r.json();
    if (!data.user?.email_confirmed_at || data.user.email?.trim().toLowerCase() !== config.email || !data.access_token) return json({ error: 'Unable to sign in with those details.' }, 401);
    const response = json({ ok: true });
    response.cookies.set(SESSION_COOKIE, data.access_token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: Math.min(data.expires_in || 3600, 3600) });
    return response;
  } catch { return json({ error: 'Sign-in is unavailable. Please try again.' }, 503); }
}
