"use client";

import { FormEvent, useState } from "react";
import { contact } from "../data";

const services = [
  "Fertility assessment (both partners)",
  "IVF",
  "IUI",
  "Semen analysis / male factor",
  "Ovulation induction",
  "Recurrent pregnancy loss",
  "Fertility preservation (egg, sperm or embryo freezing)",
  "Surrogacy support",
  "Fertility counselling",
  "General fertility opinion",
];

export function ReferralForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "fallback">("idle");
  const today = new Date().toISOString().slice(0, 10);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const fd = new FormData(event.currentTarget);
    const summary = [
      `Patient: ${fd.get("patient")}`,
      `Referral date: ${fd.get("date")}`,
      `Referring consultant: ${fd.get("consultant")}`,
      `Hospital or practice: ${fd.get("practice") || "Not stated"}`,
      `Service requested: ${fd.get("service")}`,
      `Urgency: ${fd.get("urgency")}`,
      `Patient contact provided: ${fd.get("patientContact") || "Not provided"}`,
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
          type: "CONSULTANT REFERRAL",
          service: fd.get("service"),
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
      <div className="survey-done">
        <span className="survey-tick" aria-hidden="true">
          ✓
        </span>
        <h2>Referral received.</h2>
        <p>
          Thank you, doctor. The fertility team will review this referral and contact your patient
          directly to arrange an appointment. If the referral is urgent, please also call{" "}
          {contact.phoneDisplay} so it can be flagged today.
        </p>
      </div>
    );
  }

  return (
    <form className="referral-form" onSubmit={submit}>
      <div className="referral-masthead">
        <div>
          <strong>Institute of Fertility Medicine</strong>
          <span>Lagos State University Teaching Hospital</span>
        </div>
        <div className="referral-managed">
          <small>Managed by</small>
          <strong>Kindred Path Fertility Centre</strong>
        </div>
      </div>
      <h2 className="referral-title">Referral form</h2>

      <fieldset>
        <legend>Patient</legend>
        <div className="field-grid">
          <label className="wide">
            <span>Name of patient *</span>
            <input name="patient" required />
          </label>
          <label>
            <span>Date *</span>
            <input name="date" type="date" required defaultValue={today} />
          </label>
          <label>
            <span>Patient telephone (optional)</span>
            <input name="patientContact" type="tel" />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Referring consultant</legend>
        <div className="field-grid">
          <label className="wide">
            <span>Referring consultant&rsquo;s full name *</span>
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
      </fieldset>

      <fieldset>
        <legend>Referral</legend>
        <div className="field-grid">
          <label>
            <span>Service requested *</span>
            <select name="service" required defaultValue="">
              <option value="" disabled>
                Select a service
              </option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Urgency *</span>
            <select name="urgency" required defaultValue="Routine">
              <option value="Routine">Routine</option>
              <option value="Soon">Soon</option>
              <option value="Urgent">Urgent</option>
            </select>
          </label>
          <label className="wide">
            <span>Comments</span>
            <textarea
              name="comments"
              rows={7}
              maxLength={3000}
              placeholder="Relevant history, investigations already performed, and the specific question you would like answered."
            />
          </label>
        </div>
      </fieldset>

      <p className="referral-privacy">
        <span aria-hidden="true">◇</span> This form is delivered to the centre by email and is not a
        secure clinical messaging channel. Please include only the detail needed to triage the
        referral, and telephone the centre for anything you would not send by ordinary email.
      </p>

      <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" />

      <label className="consent-row">
        <input name="consent" type="checkbox" required />
        <span>
          I confirm I am a registered medical practitioner, that the patient has consented to this
          referral, and that they are aware their details will be shared with Kindred Path.
        </span>
      </label>

      <button className="button button-primary" disabled={status === "sending"}>
        {status === "sending" ? "Sending referral…" : "Submit referral"}
      </button>

      {status === "fallback" && (
        <div className="form-status">
          <p>
            That did not send. Please call {contact.phoneDisplay} or email {contact.email} and the
            team will take the referral directly.
          </p>
        </div>
      )}
    </form>
  );
}
