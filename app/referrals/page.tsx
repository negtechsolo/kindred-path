import type { Metadata } from "next";
import { contact } from "../data";
import { ReferralForm } from "../components/ReferralForm";

export const metadata: Metadata = {
  title: "Refer a patient",
  description:
    "Consultant referral to the Institute of Fertility Medicine, LASUTH, managed by Kindred Path Fertility Centre, Ikeja, Lagos. Submit a referral online or download the form.",
};

export default function ReferralsPage() {
  return (
    <main id="main-content">
      <section className="page-hero referral-hero">
        <div className="shell page-hero-grid">
          <div>
            <span className="eyebrow light">For referring clinicians</span>
            <h1>
              Refer a patient to the <em>Institute of Fertility Medicine.</em>
            </h1>
            <p>
              Kindred Path manages the Institute of Fertility Medicine at Lagos State University
              Teaching Hospital. Colleagues across Lagos refer patients to us directly, and this is
              the fastest way to do it.
            </p>
          </div>
          <div className="referral-hero-card">
            <span>Referral desk</span>
            <strong>{contact.phoneDisplay}</strong>
            <em>{contact.hours}</em>
            <div>
              <span className="status-dot" /> Consultant referrals welcomed
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell referral-layout">
          <div className="referral-panel">
            <ReferralForm />
          </div>
          <aside className="referral-aside">
            <div className="aside-copy">
              <span className="eyebrow light">What happens next</span>
              <h2>Your patient is contacted, not left waiting.</h2>
              <ul>
                <li><span>01</span>The referral is reviewed by the fertility team.</li>
                <li><span>02</span>Your patient is contacted directly to arrange an appointment.</li>
                <li><span>03</span>You receive correspondence following the consultation.</li>
              </ul>
            </div>
            <div className="aside-note">
              <span className="eyebrow">Consultation days</span>
              <p>
                Consultations run on Tuesdays and Thursdays. Urgent referrals can be flagged by
                telephone on the same day.
              </p>
            </div>
            <div className="aside-contact">
              <span>Prefer to speak to the team?</span>
              <a href={`tel:${contact.phoneHref}`}>{contact.phoneDisplay}</a>
              <small>{contact.address}</small>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-pad soft-section">
        <div className="shell referral-reassure">
          <div>
            <span className="eyebrow">Why colleagues refer here</span>
            <h2>Your patient will be told the truth, including when the answer is no.</h2>
          </div>
          <div>
            <p><span>✓</span>Assessment for both partners before any treatment is recommended.</p>
            <p><span>✓</span>Published treatment costs, so your patient is not ambushed by the price.</p>
            <p><span>✓</span>No guaranteed outcomes and no unexplained success claims.</p>
            <p><span>✓</span>Consultant-delivered care, not a rotating roster.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
