import Link from "next/link";
import { Accordion } from "./components/Accordion";
import { HeroVisual } from "./components/HeroVisual";
import { faqs, team, treatments, treatmentSlug } from "./data";

const featuredTreatments = treatments.filter((item) => ["IVF", "IUI", "Fertility consultation", "Semen analysis", "Oocyte cryopreservation", "Fertility counselling"].includes(item.title));

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero section-pad">
        <div className="hero-glow glow-one" aria-hidden="true" />
        <div className="hero-glow glow-two" aria-hidden="true" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-mark">✦</span> Fertility care in Ikeja, Lagos</span>
            <h1>Your path to parenthood begins with <em>expert, compassionate care.</em></h1>
            <p>Personalised fertility care, advanced reproductive medicine and a team that walks with you at every step.</p>
            <div className="button-row">
              <Link className="button button-primary" href="/book">Book a confidential consultation <span aria-hidden="true">↗</span></Link>
              <Link className="button button-secondary" href="/treatments">Explore treatments</Link>
            </div>
            <div className="hero-trust" aria-label="Care highlights">
              <div><span className="trust-symbol">⌖</span><span><strong>Ikeja, Lagos</strong><small>In-person care</small></span></div>
              <div><span className="trust-symbol">◇</span><span><strong>Private support</strong><small>Handled discreetly</small></span></div>
              <div><span className="trust-symbol">◎</span><span><strong>Whole-team care</strong><small>Clinical & laboratory</small></span></div>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <section className="journey-finder">
        <div className="shell finder-card">
          <div className="finder-intro"><span>Not sure where to begin?</span><h2>Find the right starting point.</h2></div>
          <div className="finder-links">
            <Link href="/treatments"><span>01</span>Trying to conceive<small>Explore assessment and treatment</small></Link>
            <Link href="/treatments"><span>02</span>Male fertility concerns<small>Understand testing and options</small></Link>
            <Link href="/treatments"><span>03</span>Planning for later<small>Explore fertility preservation</small></Link>
            <Link href="/book"><span>04</span>I am not sure<small>Start with a consultation</small></Link>
          </div>
        </div>
      </section>

      <section className="section-pad intro-section">
        <div className="shell split-grid">
          <div className="image-stack lab-stack">
            <div className="arch-image"><img src="/images/embryology-lab.webp" alt="An embryologist working at a laboratory microscope" /></div>
            <div className="image-note glass-card"><span>Science, guided by humanity</span><strong>Care that sees the whole person.</strong></div>
            <div className="brand-orbit" aria-hidden="true"><img src="/images/kindred-path-mark-compact.png" alt="" /></div>
          </div>
          <div className="section-copy">
            <span className="eyebrow">Why Kindred Path</span>
            <h2>Advanced medicine should still feel deeply human.</h2>
            <p className="lead">Fertility care can bring clinical questions and powerful emotions at the same time. Our role is to make each step clearer, calmer and personal to you.</p>
            <div className="value-list">
              <div><span>01</span><p><strong>Listen before recommending</strong>Every plan begins with your history, priorities and questions.</p></div>
              <div><span>02</span><p><strong>Explain every option clearly</strong>You deserve honest guidance, including uncertainty and alternatives.</p></div>
              <div><span>03</span><p><strong>Coordinate the whole journey</strong>Clinical, nursing, laboratory and emotional support work together.</p></div>
            </div>
            <Link className="text-link" href="/about">Discover our approach <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="section-pad treatments-preview soft-section">
        <div className="shell">
          <div className="section-heading row-heading">
            <div><span className="eyebrow">Care built around your needs</span><h2>Explore fertility services.</h2></div>
            <p>From a first consultation to advanced treatment and preservation, each service begins with an individual clinical assessment.</p>
          </div>
          <div className="treatment-grid">
            {featuredTreatments.map((treatment, index) => (
              <article className="treatment-card" key={treatment.title}>
                <div className="treatment-card-top"><span className="card-number">{String(index + 1).padStart(2, "0")}</span>{treatment.tag && <span className="mini-tag">{treatment.tag}</span>}</div>
                <span className="treatment-category">{treatment.category}</span>
                <h3>{treatment.title}</h3><p>{treatment.description}</p>
                <Link href={`/treatments/${treatmentSlug(treatment.title)}`}>Learn about this pathway <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
          <div className="center-action"><Link className="button button-secondary" href="/treatments">View all services</Link></div>
        </div>
      </section>

      <section className="section-pad pathway-section">
        <div className="shell">
          <div className="section-heading centered"><span className="eyebrow">What happens next</span><h2>A clearer way to begin.</h2><p>You do not need to arrive with answers. The first steps are designed to help the team understand your needs.</p></div>
          <div className="pathway-line" aria-hidden="true" />
          <div className="pathway-grid">
            <article><span className="step-orb">01</span><h3>Confidential consultation</h3><p>Talk through your history, concerns and family-building goals with a specialist.</p></article>
            <article><span className="step-orb">02</span><h3>Focused assessment</h3><p>Complete only the investigations your clinical circumstances call for.</p></article>
            <article><span className="step-orb">03</span><h3>Your personalised plan</h3><p>Review the findings, options, practical steps and expected timeline together.</p></article>
          </div>
          <div className="center-action"><Link className="button button-primary" href="/book">Start with a consultation <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>

      <section className="science-band section-pad">
        <div className="science-cells" aria-hidden="true"><i /><i /><i /></div>
        <div className="shell science-grid">
          <div className="science-copy"><span className="eyebrow light">Clinical care + laboratory expertise</span><h2>Precision behind the scenes. Clarity at every step.</h2><p>Modern fertility care brings together specialist consultation, careful diagnostics, embryology and coordinated nursing support. We translate that science into guidance you can understand.</p><div className="science-points"><span>Specialist-led</span><span>Evidence-aware</span><span>Patient-centred</span></div><Link className="button button-cream" href="/about">How we care</Link></div>
          <div className="science-image"><img src="/images/embryology-lab.webp" alt="An embryologist at work in a modern laboratory" /><div className="science-caption">Every clinical decision is individual. No website can promise a personal outcome.</div></div>
        </div>
      </section>

      <section className="section-pad team-preview">
        <div className="shell">
          <div className="section-heading row-heading"><div><span className="eyebrow">People behind your care</span><h2>Meet the specialists who walk with you.</h2></div><Link className="text-link" href="/team">Meet the full team <span aria-hidden="true">→</span></Link></div>
          <div className="team-grid preview-grid">
            {team.slice(0, 4).map((member) => (
              <article className="team-card" key={member.name}><div className="team-image"><img src={member.image} alt={member.name} /></div><span>{member.role}</span><h3>{member.name}</h3><p>{member.detail}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad support-section soft-section">
        <div className="shell split-grid reverse-mobile">
          <div className="section-copy"><span className="eyebrow">Support beyond procedures</span><h2>Your emotional wellbeing belongs in the care plan.</h2><p className="lead">Fertility treatment can feel isolating. Confidential counselling and a responsive nursing team can help you process choices, prepare for treatment and feel supported between appointments.</p><ul className="check-list"><li>Individual or couple-focused support</li><li>Clear preparation before each treatment stage</li><li>Questions welcomed without judgement</li></ul><Link className="button button-secondary" href="/resources">Explore patient resources</Link></div>
          <div className="support-image"><img src="/images/supportive-care.webp" alt="A private supportive conversation with a fertility counsellor" /></div>
        </div>
      </section>

      <section className="section-pad faq-section">
        <div className="shell faq-grid">
          <div className="faq-intro"><span className="eyebrow">Common questions</span><h2>Answers for the questions that often come first.</h2><p>Still unsure? Speak with the team privately. You do not have to explain everything before booking.</p><Link className="button button-primary" href="/contact">Ask the team</Link></div>
          <Accordion items={faqs.slice(0, 5)} />
        </div>
      </section>
    </main>
  );
}
