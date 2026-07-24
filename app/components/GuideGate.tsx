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
    <form className="guide-gate" onSubmit={submit}>
      <span className="eyebrow">Free planner</span>
      <h2>
        The questions to ask <em>before</em> you pay for anything.
      </h2>
      <p>
        A four-page planner covering what each stage costs, what makes the number move, what to ask any
        clinic before you commit, and how to tell a real quote from an optimistic one. It opens on
        this page and you can download it as a PDF to take with you.
      </p>
      <div className="field-grid">
        <label>
          <span>Full name *</span>
          <input name="name" required autoComplete="name" />
        </label>
        <label>
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
            I agree that Kindred Path may contact me about fertility care. No medical details are
            collected here.
          </span>
        </label>
      </div>
      <button className="button button-primary" disabled={status === "sending"}>
        {status === "sending" ? "Opening…" : "Open the planner"}
      </button>
    </form>
  );
}
