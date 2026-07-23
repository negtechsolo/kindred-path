"use client";

import { FormEvent, useMemo, useState } from "react";
import { contact, treatments } from "../data";

type FormState = {
  service: string;
  mode: string;
  name: string;
  phone: string;
  email: string;
  day: string;
  time: string;
  consent: boolean;
};

const initialState: FormState = {
  service: "Fertility consultation",
  mode: "In-person consultation",
  name: "",
  phone: "",
  email: "",
  day: "",
  time: "Morning",
  consent: false,
};

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [deliveryFallback, setDeliveryFallback] = useState(false);

  const message = useMemo(
    () =>
      [
        "Hello Kindred Path, I would like to request an appointment.",
        `Name: ${form.name}`,
        `Service: ${form.service}`,
        `Visit type: ${form.mode}`,
        `Preferred day: ${form.day || "Not specified"}`,
        `Preferred time: ${form.time}`,
        `Phone: ${form.phone}`,
        `Email: ${form.email || "Not provided"}`,
      ].join("\n"),
    [form],
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function next() {
    if (step === 2 && (!form.name.trim() || !form.phone.trim())) return;
    setStep((current) => Math.min(current + 1, 4));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!form.consent) return;
    setSending(true);
    setDeliveryFallback(false);
    try {
      const response = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, type: "appointment", website: "" }) });
      if (!response.ok) { setDeliveryFallback(true); return; }
      setSent(true);
    } catch { setDeliveryFallback(true); } finally { setSending(false); }
  }

  if (sent) {
    return (
      <div className="booking-success" role="status">
        <span className="success-mark" aria-hidden="true">✓</span>
        <span className="eyebrow">Request sent</span>
        <h2>The care team has your appointment request.</h2>
        <p>This is not yet a confirmed appointment. The team will contact you to confirm availability.</p>
        <a className="button button-primary" href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">Also message on WhatsApp</a>
        <button className="text-button" type="button" onClick={() => setSent(false)}>Edit my request</button>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={submit}>
      <div className="booking-progress" aria-label={`Step ${step} of 4`}>
        {[1, 2, 3, 4].map((number) => (
          <div className={number <= step ? "active" : ""} key={number}>
            <span>{number < step ? "✓" : number}</span>
            <small>{["Care", "Details", "Timing", "Review"][number - 1]}</small>
          </div>
        ))}
      </div>

      {step === 1 && (
        <fieldset className="form-step">
          <legend>What would you like help with?</legend>
          <p className="field-note">If you are unsure, choose “Fertility consultation”. A specialist will guide the next step.</p>
          <label>
            <span>Service or concern</span>
            <select value={form.service} onChange={(event) => update("service", event.target.value)}>
              {treatments.map((item) => <option key={item.title}>{item.title}</option>)}
              <option>Not sure yet</option>
            </select>
          </label>
          <div className="choice-grid two">
            {["In-person consultation", "Online consultation"].map((mode) => (
              <label className={`choice-card ${form.mode === mode ? "selected" : ""}`} key={mode}>
                <input type="radio" name="mode" value={mode} checked={form.mode === mode} onChange={() => update("mode", mode)} />
                <span className="choice-dot" aria-hidden="true" />
                <strong>{mode}</strong>
                <small>{mode.startsWith("In-person") ? "Visit the centre in Ikeja" : "Speak with the team remotely"}</small>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="form-step">
          <legend>How can the team reach you?</legend>
          <p className="field-note">Please do not include sensitive medical information here. Your history will be discussed privately with the care team.</p>
          <div className="field-grid">
            <label><span>Full name *</span><input required value={form.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" /></label>
            <label><span>Phone number *</span><input required type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} autoComplete="tel" /></label>
            <label className="wide"><span>Email address</span><input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" /></label>
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset className="form-step">
          <legend>When would you prefer to speak?</legend>
          <p className="field-note">This is a preference, not a confirmed appointment. The team will contact you with available times.</p>
          <div className="field-grid">
            <label><span>Preferred day</span><input type="date" value={form.day} onChange={(event) => update("day", event.target.value)} /></label>
            <label><span>Preferred time</span><select value={form.time} onChange={(event) => update("time", event.target.value)}><option>Morning</option><option>Afternoon</option><option>No preference</option></select></label>
          </div>
          <div className="availability-note"><span aria-hidden="true">○</span><p><strong>Opening hours</strong>{contact.hours}</p></div>
        </fieldset>
      )}

      {step === 4 && (
        <fieldset className="form-step">
          <legend>Review your request</legend>
          <div className="review-grid">
            <div><span>Service</span><strong>{form.service}</strong></div>
            <div><span>Visit</span><strong>{form.mode}</strong></div>
            <div><span>Name</span><strong>{form.name}</strong></div>
            <div><span>Contact</span><strong>{form.phone}</strong></div>
            <div><span>Preferred day</span><strong>{form.day || "No preference"}</strong></div>
            <div><span>Preferred time</span><strong>{form.time}</strong></div>
          </div>
          <label className="consent-row">
            <input type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} required />
            <span>I agree to share these contact and appointment-preference details with Kindred Path so the team can respond. No medical details are being submitted through this form.</span>
          </label>
        </fieldset>
      )}

      <div className="form-actions">
        {step > 1 && <button className="button button-secondary" type="button" onClick={() => setStep((current) => current - 1)}>Back</button>}
        {step < 4 ? (
          <button className="button button-primary" type="button" onClick={next}>Continue <span aria-hidden="true">→</span></button>
        ) : (
          <button className="button button-primary" type="submit" disabled={!form.consent || sending}>{sending ? "Sending…" : "Send appointment request"} <span aria-hidden="true">→</span></button>
        )}
      </div>
      {deliveryFallback && <div className="form-status"><p>Secure email delivery is still being configured. You can send the prepared request on WhatsApp now.</p><a href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">Continue on WhatsApp →</a></div>}
    </form>
  );
}
