"use client";

import { useState } from "react";
import { contact } from "../data";

type Choice = { value: string; label: string; hint?: string };
type Step = {
  id: string;
  eyebrow: string;
  question: string;
  help?: string;
  choices: Choice[];
  optional?: boolean;
};

/**
 * Deliberately non-clinical. Nothing here asks for medical history, results or
 * diagnoses — that belongs in a private consultation, not an email. These
 * questions exist so the care team knows how to prepare, and so the person
 * filling this in feels met rather than processed.
 */
const steps: Step[] = [
  {
    id: "reason",
    eyebrow: "Step 1 of 5",
    question: "What brings you to Kindred Path?",
    help: "There is no wrong answer here, and you can change your mind later.",
    choices: [
      { value: "First conversation", label: "This is my first conversation about fertility", hint: "Most people start here" },
      { value: "Trying for a while", label: "We have been trying for a while" },
      { value: "Referred by a doctor", label: "A doctor referred me", hint: "Bring your referral letter if you have one" },
      { value: "Freezing", label: "I want to ask about egg, sperm or embryo freezing" },
      { value: "Second opinion", label: "I have had treatment elsewhere and want another view" },
      { value: "Something else", label: "Something else" },
    ],
  },
  {
    id: "attending",
    eyebrow: "Step 2 of 5",
    question: "Who would be coming to the appointment?",
    help: "Fertility assessment usually involves both partners, but you are welcome to come alone first.",
    choices: [
      { value: "Just me", label: "Just me" },
      { value: "Me and my partner", label: "Me and my partner" },
      { value: "Not decided", label: "I have not decided yet" },
    ],
  },
  {
    id: "history",
    eyebrow: "Step 3 of 5",
    question: "Have you had fertility tests or treatment before?",
    help: "A yes or no is enough. Please keep results and medical details for your private consultation.",
    choices: [
      { value: "None yet", label: "No, nothing yet" },
      { value: "Some tests", label: "Some tests, but no treatment" },
      { value: "Previous treatment", label: "Yes, treatment elsewhere" },
      { value: "Prefer not to say", label: "I would rather not say here" },
    ],
  },
  {
    id: "mode",
    eyebrow: "Step 4 of 5",
    question: "How would you prefer to meet?",
    choices: [
      { value: "In person", label: "In person at Ikeja", hint: "1-5 Oba Akinjobi Street, G.R.A." },
      { value: "Video", label: "A video consultation" },
      { value: "Either", label: "Either is fine" },
    ],
  },
  {
    id: "day",
    eyebrow: "Step 5 of 5",
    question: "Which consultation day suits you better?",
    help: "Consultations run on Tuesdays and Thursdays. We will confirm an exact time with you.",
    choices: [
      { value: "Tuesday", label: "Tuesday" },
      { value: "Thursday", label: "Thursday" },
      { value: "Either day", label: "Either day works" },
      { value: "Not sure", label: "I am not sure yet" },
    ],
  },
];

export function BookingSurvey() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "fallback">("idle");
  const [error, setError] = useState("");

  const atDetails = index === steps.length;
  const progress = Math.round((Math.min(index, steps.length) / (steps.length + 1)) * 100);

  function choose(stepId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [stepId]: value }));
    window.setTimeout(() => setIndex((i) => i + 1), 190);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
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
          type: "appointment request",
          service: answers.reason,
          mode: answers.mode,
          day: answers.day,
          time: fd.get("time"),
          attending: answers.attending,
          history: answers.history,
          message: fd.get("message"),
          consent: fd.get("consent") === "on",
        }),
      });
      if (response.ok) setStatus("sent");
      else {
        setStatus("fallback");
        setError(
          response.status === 503
            ? "Our email delivery is being configured."
            : "That did not send.",
        );
      }
    } catch {
      setStatus("fallback");
      setError("We could not reach the server.");
    }
  }

  if (status === "sent") {
    return (
      <div className="survey-done">
        <span className="survey-tick" aria-hidden="true">
          ✓
        </span>
        <h2>Thank you. Your request is with the care team.</h2>
        <p>
          Someone will contact you using the details you gave to confirm an available time. If you
          would rather speak to a person now, call {contact.phoneDisplay}.
        </p>
        <a
          className="button button-primary"
          href={`https://wa.me/${contact.whatsapp}`}
          target="_blank"
          rel="noreferrer"
        >
          Message us on WhatsApp
        </a>
      </div>
    );
  }

  const step = steps[index];

  return (
    <div className="survey">
      <div className="survey-progress" aria-hidden="true">
        <i style={{ width: `${atDetails ? 100 : progress}%` }} />
      </div>

      {!atDetails && (
        <div className="survey-step" key={step.id}>
          <span className="eyebrow">{step.eyebrow}</span>
          <h2>{step.question}</h2>
          {step.help && <p className="survey-help">{step.help}</p>}
          <div className="survey-choices">
            {step.choices.map((choice) => (
              <button
                type="button"
                key={choice.value}
                className={answers[step.id] === choice.value ? "is-chosen" : undefined}
                onClick={() => choose(step.id, choice.value)}
              >
                <span>{choice.label}</span>
                {choice.hint && <em>{choice.hint}</em>}
              </button>
            ))}
          </div>
          {index > 0 && (
            <button type="button" className="survey-back" onClick={() => setIndex((i) => i - 1)}>
              ← Back
            </button>
          )}
        </div>
      )}

      {atDetails && (
        <form className="survey-step survey-details" onSubmit={submit}>
          <span className="eyebrow">Last step</span>
          <h2>How should the team reach you?</h2>
          <p className="survey-help">
            Please keep medical history and test results for your private consultation.
          </p>

          <ul className="survey-recap">
            {steps.map((s) => (
              <li key={s.id}>
                <span>{s.question}</span>
                <strong>{answers[s.id] ?? "Not answered"}</strong>
              </li>
            ))}
          </ul>

          <div className="field-grid">
            <label>
              <span>Full name *</span>
              <input name="name" required autoComplete="name" />
            </label>
            <label>
              <span>Phone *</span>
              <input name="phone" required type="tel" autoComplete="tel" />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" />
            </label>
            <label>
              <span>Preferred time of day</span>
              <select name="time" defaultValue="">
                <option value="">No preference</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
              </select>
            </label>
            <label className="wide">
              <span>Anything you would like the team to know? (optional)</span>
              <textarea name="message" rows={4} maxLength={1200} />
            </label>
            <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" />
            <label className="consent-row wide">
              <input name="consent" type="checkbox" required />
              <span>
                I agree that Kindred Path may use these details to contact me about an appointment.
              </span>
            </label>
          </div>

          <div className="survey-actions">
            <button type="button" className="survey-back" onClick={() => setIndex((i) => i - 1)}>
              ← Back
            </button>
            <button className="button button-primary" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send my request"}
            </button>
          </div>

          {status === "fallback" && (
            <div className="form-status">
              <p>{error} Please call or use WhatsApp and the team will help you directly.</p>
              <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer">
                Open WhatsApp →
              </a>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
