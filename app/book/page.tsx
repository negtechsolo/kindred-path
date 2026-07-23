import type { Metadata } from "next";
import { BookingSurvey } from "../components/BookingSurvey";
import { contact } from "../data";

export const metadata: Metadata = { title: "Book a Consultation", description: "Request a confidential fertility consultation with Kindred Path in Ikeja or online." };

export default function BookPage() {
  return (
    <main id="main-content" className="booking-page">
      <section className="booking-hero"><div className="shell narrow-page-hero"><span className="eyebrow">Request an appointment</span><h1>Take the first step, <em>privately and at your pace.</em></h1><p>Five short questions, none of them medical, so the team knows how to prepare before you arrive. It takes about a minute.</p></div></section>
      <section className="booking-section section-pad"><div className="shell booking-layout"><div className="booking-panel"><BookingSurvey /></div><aside className="booking-aside"><div className="aside-image"><img src="/images/supportive-care.webp" alt="A calm conversation with a fertility professional" /></div><div className="aside-copy"><span className="eyebrow light">What to expect</span><h2>A conversation, not a commitment.</h2><ul><li><span>01</span>We listen to what brings you in.</li><li><span>02</span>We explain possible next steps.</li><li><span>03</span>You decide what feels right.</li></ul></div><div className="aside-contact"><span>Prefer to speak directly?</span><a href={`tel:${contact.phoneHref}`}>{contact.phoneDisplay}</a><small>{contact.hours}</small></div></aside></div></section>
    </main>
  );
}
