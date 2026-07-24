"use client";

import { FormEvent, useState } from "react";
import { contact } from "../data";

const SERVICES = [
  "Fertility assessment (both partners)",
  "IVF",
  "IUI",
  "Male factor / semen analysis",
  "Ovulation induction",
  "Recurrent pregnancy loss",
  "Fertility preservation",
  "Surrogacy support",
  "Fertility counselling",
  "General fertility opinion",
];

const URGENCY = [
  { value: "Routine", label: "Routine", hint: "Contacted within the usual timeframe" },
  { value: "Soon", label: "Soon", hint: "Prioritised in the next available clinic" },
  { value: "Urgent", label: "Urgent", hint: "Flagged today. Please also telephone" },
];

export function ReferralForm() {
  const [step, setStep] = useState(0);
  const [urgency, setUrgency] = useState("");
  const [service, setService] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "fallback">("idle");
  const today = new Date().toISOString().slice(0, 10);
  const TOTAL = 4;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const fd = new FormData(event.currentTarget);
    const summary = [
      `URGENCY: ${urgency}`,
      `Service requested: ${service}`,
      "",
      `Patient: ${fd.get("patient")}`,
      `Patient telephone: ${fd.get("patientContact") || "Not provided"}`,
      `Referral date: ${fd.get("date")}`,
      "",
      `Referring consultant: ${fd.get("consultant")}`,
      `Hospital or practice: ${fd.get("practice") || "Not stated"}`,
      `Telephone: ${fd.get("telephone")}`,
      `Email: ${fd.get("email")}`,
      "",
      "Clinical comments:",
      String(fd.get("comments") || "None supplied"),
    ].join("\n");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("consultant"),
          phone: fd.get("telephone"),
          email: fd.get("email"),
          website: fd.get("website"),
          type: `CONSULTANT REFERRAL (${urgency})`,
          service,
          message: summary,
          consent: fd.get("consent") === "on",
        }),
      });
      setStatus(response.ok ? "sent" : "fallback");
    } catch {
      setStatus("fallback");
    }
  }

  if (status === "sent") {
    return (
      <div className="wizard-done">
        <span className="wizard-tick" aria-hidden="true">
          ✓
        </span>
        <h2>Referral received.</h2>
        <p>
          Thank you, doctor. The fertility team will review this referral and contact your patient
          directly to arrange an appointment. You will receive correspondence after the consultation.
        </p>
        {urgency === "Urgent" && (
          <p className="wizard-urgent">
            You marked this urgent. Please also telephone {contact.phoneDisplay} so it can be flagged
            today.
          </p>
        )}
      </div>
    );
  }

  return (
    <form className="wizard" onSubmit={submit}>
      <header className="wizard-head">
        <div className="wizard-brand">
          <strong>Institute of Fertility Medicine</strong>
          <span>Lagos State University Teaching Hospital</span>
        </div>
        <div className="wizard-managed">
          <small>Managed by</small>
          <strong>Kindred Path</strong>
        </div>
      </header>

      <div className="wizard-rail" aria-hidden="true">
        {["Priority", "Patient", "You", "Clinical"].map((label, i) => (
          <div key={label} className={i <= step ? "is-done" : undefined}>
            <i>{i < step ? "✓" : i + 1}</i>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <section className={step === 0 ? "wizard-step" : "wizard-step is-hidden"}>
        <span className="eyebrow">Step 1 of {TOTAL}</span>
        <h2>How soon does this patient need to be seen?</h2>
        <div className="wizard-cards">
          {URGENCY.map((u) => (
            <button
              type="button"
              key={u.value}
              className={`urgency-${u.value.toLowerCase()}${urgency === u.value ? " is-chosen" : ""}`}
              onClick={() => {
                setUrgency(u.value);
                setStep(1);
              }}
            >
              <strong>{u.label}</strong>
              <span>{u.hint}</span>
            </button>
          ))}
        </div>
        <p className="wizard-help">
          Consultations run on Tuesdays and Thursdays. Urgent referrals are triaged the same day.
        </p>
      </section>

      <section className={step === 1 ? "wizard-step" : "wizard-step is-hidden"}>
        <span className="eyebrow">Step 2 of {TOTAL}</span>
        <h2>Who are you referring?</h2>
        <div className="field-grid">
          <label className="wide">
            <span>Name of patient *</span>
            <input name="patient" required />
          </label>
          <label>
            <span>Patient telephone</span>
            <input name="patientContact" type="tel" />
          </label>
          <label>
            <span>Date of referral *</span>
            <input name="date" type="date" required defaultValue={today} />
          </label>
          <label className="wide">
            <span>Service requested *</span>
            <select
              name="service"
              required
              value={service}
              onChange={(event) => setService(event.target.value)}
            >
              <option value="" disabled>
                Select a service
              </option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>
        <nav className="wizard-nav">
          <button type="button" className="wizard-back" onClick={() => setStep(0)}>
            ← Back
          </button>
          <button type="button" className="button button-primary" onClick={() => setStep(2)}>
            Continue
          </button>
        </nav>
      </section>

      <section className={step === 2 ? "wizard-step" : "wizard-step is-hidden"}>
        <span className="eyebrow">Step 3 of {TOTAL}</span>
        <h2>Your details, doctor.</h2>
        <p className="wizard-help">So we can send you correspondence after the consultation.</p>
        <div className="field-grid">
          <label className="wide">
            <span>Your full name *</span>
            <input name="consultant" required autoComplete="name" />
          </label>
          <label className="wide">
            <span>Hospital or practice</span>
            <input name="practice" />
          </label>
          <label>
            <span>Telephone *</span>
            <input name="telephone" required type="tel" autoComplete="tel" />
          </label>
          <label>
            <span>Email address *</span>
            <input name="email" required type="email" autoComplete="email" />
          </label>
        </div>
        <nav className="wizard-nav">
          <button type="button" className="wizard-back" onClick={() => setStep(1)}>
            ← Back
          </button>
          <button type="button" className="button button-primary" onClick={() => setStep(3)}>
            Continue
          </button>
        </nav>
      </section>

      <section className={step === 3 ? "wizard-step" : "wizard-step is-hidden"}>
        <span className="eyebrow">Last step</span>
        <h2>Anything the team should know?</h2>
        <ul className="wizard-recap">
          <li>
            <span>Priority</span>
            <strong>{urgency || "Not set"}</strong>
          </li>
          <li>
            <span>Service</span>
            <strong>{service || "Not set"}</strong>
          </li>
        </ul>
        <div className="field-grid">
          <label className="wide">
            <span>Clinical comments</span>
            <textarea
              name="comments"
              rows={7}
              maxLength={3000}
              placeholder="Relevant history, investigations already performed, and the specific question you would like answered."
            />
          </label>
        </div>
        <p className="wizard-privacy">
          <span aria-hidden="true">◇</span> Delivered to the centre by email. This is not a secure
          clinical messaging channel, so please include only what is needed to triage the referral,
          and telephone us for anything you would not send by ordinary email.
        </p>
        <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" />
        <label className="consent-row">
          <input name="consent" type="checkbox" required />
          <span>
            I confirm I am a registered medical practitioner, that the patient has consented to this
            referral, and that they know their details will be shared with Kindred Path.
          </span>
        </label>
        <nav className="wizard-nav">
          <button type="button" className="wizard-back" onClick={() => setStep(2)}>
            ← Back
          </button>
          <button className="button button-primary" disabled={status === "sending"}>
            {status === "sending" ? "Sending referral…" : "Submit referral"}
          </button>
        </nav>
        {status === "fallback" && (
          <div className="form-status">
            <p>
              That did not send. Please call {contact.phoneDisplay} or email {contact.email} and the
              team will take the referral directly.
            </p>
          </div>
        )}
      </section>
    </form>
  );
}
