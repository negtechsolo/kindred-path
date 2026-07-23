import { NextResponse } from "next/server";

const clean = (value: unknown, max = 500) => String(value ?? "").trim().slice(0, max);
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c]!));

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (clean(body.website)) return NextResponse.json({ ok: true });
  const name = clean(body.name, 100), phone = clean(body.phone, 50), email = clean(body.email, 150);
  if (!name || !phone || body.consent !== true) return NextResponse.json({ error: "Name, phone and consent are required." }, { status: 400 });
  const apiKey = process.env.RESEND_API_KEY, to = process.env.ENQUIRY_TO_EMAIL || "Kindredpathifm@gmail.com", from = process.env.ENQUIRY_FROM_EMAIL;
  if (!apiKey || !from) return NextResponse.json({ error: "Secure email delivery is awaiting configuration.", code: "EMAIL_NOT_CONFIGURED" }, { status: 503 });
  const fields = [["Type", clean(body.type,30)],["Name",name],["Phone",phone],["Email",email || "Not provided"],["Service",clean(body.service,120)],["Visit",clean(body.mode,80)],["Preferred day",clean(body.day,30)],["Preferred time",clean(body.time,30)],["Attending",clean(body.attending,60)],["Previous care",clean(body.history,60)],["Message",clean(body.message,3500)]];
  const html = `<h2>New Kindred Path website enquiry</h2>${fields.map(([k,v])=>`<p><strong>${escapeHtml(k)}:</strong> ${escapeHtml(v)}</p>`).join("")}<p><small>Contact preference only. Do not request detailed medical information by unsecured email.</small></p>`;
  const response = await fetch("https://api.resend.com/emails", { method:"POST", headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json"}, body:JSON.stringify({from,to:[to],reply_to:email || undefined,subject:`Website ${clean(body.type,30) || "enquiry"}: ${name}`,html}) });
  if (!response.ok) return NextResponse.json({ error: "Delivery failed. Please call or use WhatsApp." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
