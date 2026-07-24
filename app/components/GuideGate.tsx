"use client";

import { FormEvent, ReactNode, useState } from "react";
import { contact } from "../data";

export function GuideGate({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<"idle" | "sending" | "open" | "fallback">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const fd = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          phone: fd.get("phone"),
          email: fd.get("email"),
          website: fd.get("website"),
          message: "Requested the fertility cost planner.",
          type: "cost-planner",
          consent: fd.get("consent") === "on",
        }),
      });
      // The guide opens either way. We are not holding information hostage
      // to an email server that might be having a bad day.
      setStatus(response.ok ? "open" : "fallback");
    } catch {
      setStatus("fallback");
    }
  }

  if (status === "open" || status === "fallback") {
    return (
      <div className="guide-unlocked">
        {status === "fallback" && (
          <p className="guide-note">
            We could not log your request just now, but here is the planner anyway. If you would
            like the team to follow up, send a message on{" "}
            <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            .
          </p>
        )}
        <div className="guide-download">
          <div>
            <span className="eyebrow">Your copy</span>
            <h3>Take the planner with you.</h3>
            <p>
              Four pages. What each stage costs, the nine questions to ask any clinic, and the five
              warning signs. Print it and bring it to your appointment.
            </p>
          </div>
          <a
            className="button button-primary"
            href="/kindred-path-fertility-cost-planner.pdf"
            download="Kindred-Path-Fertility-Cost-Planner.pdf"
          >
            Download the PDF
          </a>
        </div>
        {children}
      </div>
    );
  }

  return (
    <form className="lead-card" onSubmit={submit}>
      <div className="lead-pitch">
        <span className="eyebrow">Free planner</span>
        <h2>
          The questions to ask <em>before</em> you pay for anything.
        </h2>
        <p>
          Five pages, written to be printed and carried into an appointment. Take it to any clinic,
          including ours.
        </p>
        <ul className="lead-contents">
          <li><strong>Where the money goes</strong><span>All four costs, added up honestly</span></li>
          <li><strong>Nine questions</strong><span>On the quote, success rates and your plan</span></li>
          <li><strong>Five warning signs</strong><span>What should make you pause before paying</span></li>
          <li><strong>What to bring</strong><span>A checklist for your first appointment</span></li>
        </ul>
      </div>

      <div className="lead-form">
        <h3>Where should we send it?</h3>
        <p className="lead-note">It opens on this page straight away. Nothing to wait for.</p>
        <div className="field-grid">
          <label className="wide">
            <span>Full name *</span>
            <input name="name" required autoComplete="name" />
          </label>
          <label className="wide">
            <span>Phone *</span>
            <input name="phone" required type="tel" autoComplete="tel" />
          </label>
          <label className="wide">
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" />
          </label>
          <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" />
          <label className="consent-row wide">
            <input name="consent" type="checkbox" required />
            <span>
              Kindred Path may contact me about fertility care. No medical details are collected here.
            </span>
          </label>
        </div>
        <button className="button button-primary lead-submit" disabled={status === "sending"}>
          {status === "sending" ? "Opening\u2026" : "Open the planner"}
        </button>
        <p className="lead-trust">
          <span aria-hidden="true">\u25c7</span> No spam. We will not share your details.
        </p>
      </div>
    </form>
  );
}
