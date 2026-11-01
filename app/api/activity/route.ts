import { createHmac } from 'node:crypto';
import { NextResponse } from 'next/server';
import { sameOrigin } from '../../../lib/admin';
import { database, databaseConfigured } from '../../../lib/records';
const events = ['page_view', 'campaign_book', 'campaign_ask', 'call_click', 'whatsapp_click', 'planner_download'];
export async function POST(request: Request) {
  const empty = () => new NextResponse(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
  if (!sameOrigin(request) || !databaseConfigured() || request.headers.get('dnt') === '1') return empty();
  try {
    const text = await request.text(); if (text.length > 2000) return empty();
    const body = JSON.parse(text);
    if (!events.includes(body.event) || typeof body.path !== 'string' || body.path.length > 160 || !/^\/(?:$|(?:about|book|contact|costs|planner|referrals|resources|stories|team|treatments|privacy|terms)(?:\/[a-z0-9-]+)*)$/.test(body.path)) return empty();
    let referrer = '';
    try { referrer = new URL(body.referrer).hostname.slice(0, 150); } catch { /* Direct visit. */ }
    const ip = request.headers.get('x-vercel-forwarded-for') || request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const hour = new Date().toISOString().slice(0, 13);
    // Short-lived opaque rate-limit key. Raw IP addresses are never stored.
    const bucket = createHmac('sha256', process.env.SUPABASE_SERVICE_ROLE_KEY!).update(`${hour}:${ip}`).digest('hex');
    await database('rpc/kp_main_track', { method: 'POST', body: JSON.stringify({ event_name: body.event, page_path: body.path, referring_host: referrer, rate_key: bucket }) });
  } catch { /* Analytics never disrupt browsing. */ }
  return empty();
}
