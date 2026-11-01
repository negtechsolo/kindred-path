import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
export const SESSION_COOKIE = 'kp_main_admin';
export const privateHeaders = { 'Cache-Control': 'no-store, private', 'X-Robots-Tag': 'noindex, nofollow', 'Referrer-Policy': 'no-referrer' };
export function authConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, '');
  const key = process.env.SUPABASE_ANON_KEY;
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  return url && key && email ? { url, key, email } : null;
}
export async function adminUser() {
  const config = authConfig();
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!config || !token) return null;
  try {
    const r = await fetch(`${config.url}/auth/v1/user`, { headers: { apikey: config.key, Authorization: `Bearer ${token}` }, cache: 'no-store', signal: AbortSignal.timeout(8000) });
    if (!r.ok) return null;
    const user = await r.json();
    return user.id && user.email_confirmed_at && user.email?.trim().toLowerCase() === config.email ? { id: user.id as string, email: user.email as string } : null;
  } catch { return null; }
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  const configured = process.env.SITE_URL;
  return !!origin && origin === (configured ? new URL(configured).origin : new URL(request.url).origin);
}
export function json(data: unknown, status = 200) { return NextResponse.json(data, { status, headers: privateHeaders }); }
