import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About Us", description: "Learn about Kindred Path's patient-centred approach to fertility medicine in Lagos." };

const values = [
  ["Compassion", "We recognise the emotional reality of fertility care and treat every person with dignity."],
  ["Ethical integrity", "We explain choices, uncertainty, likely next steps and limitations without pressure."],
  ["Collaboration", "Specialists, embryologists, nurses, counsellors and patients make decisions together."],
  ["Innovation", "New approaches are considered carefully through evidence, suitability and informed consent."],
  ["Excellence", "Quality is expressed through careful clinical work, communication and follow-through."],
];

export default function AboutPage() {
  return (
    <main id="main-content">
      <section className="page-hero about-hero">
        <div className="page-hero-orb orb-a" aria-hidden="true" /><div className="page-hero-orb orb-b" aria-hidden="true" />
        <div className="shell page-hero-grid">
          <div><span className="eyebrow light">About Kindred Path</span><h1>Hope deserves both <em>science and humanity.</em></h1><p>Kindred Path brings specialist fertility care, laboratory expertise and compassionate support together in one coordinated patient journey.</p></div>
          <div className="page-hero-mark"><img src="/images/kindred-path-mark-compact.png" alt="Kindred Path mother and child emblem" /></div>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell split-grid story-grid">
          <div className="story-image"><img src="/images/hero-consultation.webp" alt="A calm fertility consultation" /><div className="story-badge"><strong>One journey.</strong><span>A coordinated team around you.</span></div></div>
          <div className="section-copy"><span className="eyebrow">Our story</span><h2>Created to make a difficult journey feel more supported.</h2><p className="lead">Kindred Path was founded around a simple purpose: to bring hope to life through personalised reproductive medicine and a genuinely human standard of care.</p><p>Technology matters. Clinical expertise matters. But so do the moments when someone listens properly, explains a result without rushing and helps you understand what comes next.</p><p>That is the experience we are working to provide, from the first enquiry through consultation, assessment, treatment and follow-up.</p></div>
        </div>
      </section>

      <section className="mission-section section-pad soft-section">
        <div className="shell mission-grid">
          <article><span>01 / Mission</span><h2>To empower individuals and couples with personalised, compassionate fertility care.</h2><p>We combine reproductive medicine with clear guidance and emotional support so patients can make informed decisions about building their families.</p></article>
          <article className="dark-card"><span>02 / Vision</span><h2>To help create a future where every person can find a credible path forward.</h2><p>Our ambition is to be recognised for ethical standards, clinical quality and an unwavering commitment to patient wellbeing.</p></article>
        </div>
      </section>

      <section className="section-pad values-section">
        <div className="shell"><div className="section-heading centered"><span className="eyebrow">What guides us</span><h2>Values patients should be able to feel.</h2><p>These principles shape the experience we aim to deliver at every point of contact.</p></div><div className="values-grid">{values.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div>
      </section>

      <section className="care-standard section-pad">
        <div className="shell care-standard-grid">
          <div><span className="eyebrow light">Our care standard</span><h2>No pressure. No unexplained claims. No one-size-fits-all plan.</h2></div>
          <div className="standard-list"><p><span>✓</span>Recommendations should follow assessment, not marketing.</p><p><span>✓</span>Success information should always be explained in context.</p><p><span>✓</span>Consent, confidentiality and patient choice come first.</p><p><span>✓</span>You should understand practical next steps before deciding.</p></div>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell simple-cta-card"><div><span className="eyebrow">Meet the people behind the care</span><h2>A multidisciplinary team, working as one.</h2></div><div><Link className="button button-primary" href="/team">Meet our team</Link><Link className="button button-secondary" href="/book">Book a consultation</Link></div></div>
      </section>
    </main>
  );
}
