import type { Metadata } from "next";
import Link from "next/link";
import { contact } from "../data";
import { currency, tariff, tariffNote, totalFor, worked } from "../pricing";

export const metadata: Metadata = {
  title: "Treatment costs",
  description:
    "Published fertility treatment costs at Kindred Path Fertility Centre, Ikeja, Lagos. Consultation, laboratory tests, IVF using your own or a donor cycle, and medication, with realistic totals.",
};

export default function CostsPage() {
  const whatsapp = encodeURIComponent(
    "Hello Kindred Path, I have read the published costs and would like to ask a question.",
  );

  return (
    <main id="main-content">
      <section className="page-hero costs-hero">
        <div className="shell page-hero-grid">
          <div>
            <span className="eyebrow light">Treatment costs</span>
            <h1>
              We would rather you saw the numbers <em>now</em> than after your hopes are raised.
            </h1>
            <p>
              Most clinics ask you to come in before they will discuss money. We think that is the
              wrong way round. Here is what treatment costs at Kindred Path, including the parts
              people are usually not told about until later.
            </p>
          </div>
          <div className="costs-hero-card">
            <span>Consultation</span>
            <strong>{currency(30000)}</strong>
            <em>Tuesdays and Thursdays</em>
            <div>
              <span className="status-dot" /> Prices reviewed periodically
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell">
          <div className="section-heading">
            <span className="eyebrow">Published tariff</span>
            <h2>What each stage costs.</h2>
            <p className="section-copy">
              These are the individual line items. Almost nobody pays only one of them, which is why
              the realistic totals are set out further down this page.
            </p>
          </div>

          <div className="tariff-list">
            {tariff.map((item) => (
              <article key={item.id} className="tariff-row">
                <div className="tariff-head">
                  <h3>{item.name}</h3>
                  <p className="tariff-price">
                    {item.from && <small>from</small>}
                    <strong>{currency(item.amount)}</strong>
                    {item.note && <em>{item.note}</em>}
                  </p>
                </div>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>

          <p className="tariff-note">
            <span aria-hidden="true">◇</span> {tariffNote}
          </p>
        </div>
      </section>

      <section className="section-pad soft-section">
        <div className="shell">
          <div className="section-heading">
            <span className="eyebrow">The number that actually matters</span>
            <h2>What a full cycle realistically comes to.</h2>
            <p className="section-copy">
              When a clinic quotes you a single IVF figure, it usually means the treatment cycle
              alone. It rarely includes your tests or your medication. Here is the same information
              added up honestly.
            </p>
          </div>

          <div className="worked-grid">
            {worked.map((plan) => (
              <article key={plan.id} className="worked-card">
                <span className="eyebrow">{plan.label}</span>
                <ol>
                  {plan.lines.map((id) => {
                    const item = tariff.find((t) => t.id === id)!;
                    return (
                      <li key={id}>
                        <span>{item.name}</span>
                        <strong>
                          {item.from && "from "}
                          {currency(item.amount)}
                        </strong>
                      </li>
                    );
                  })}
                </ol>
                <div className="worked-total">
                  <span>Realistic total</span>
                  <strong>from {currency(totalFor(plan.lines))}</strong>
                </div>
              </article>
            ))}
          </div>

          <p className="tariff-note">
            <span aria-hidden="true">◇</span> These totals assume one cycle. Some people need more
            than one, and we will always tell you that before you begin rather than after.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell cost-factors">
          <div className="section-heading">
            <span className="eyebrow">Straight answers</span>
            <h2>What moves the number, and what does not.</h2>
          </div>
          <div className="cost-factor-grid">
            <article>
              <h3>Medication is the least predictable part</h3>
              <p>
                Your dose depends on how your body responds to stimulation, which nobody can know
                in advance. This is the line most likely to differ from the figure above, and it is
                why we quote it as a starting point rather than a fixed price.
              </p>
            </article>
            <article>
              <h3>Tests come before treatment, not after</h3>
              <p>
                Assessment for both partners happens before anything is recommended. Occasionally it
                shows that a simpler and much less expensive treatment is appropriate, and we would
                rather find that out at the start.
              </p>
            </article>
            <article>
              <h3>We do not charge for hope</h3>
              <p>
                There is no package that improves your chances by costing more. If someone offers
                you one, ask them to show you the evidence behind it.
              </p>
            </article>
            <article>
              <h3>Ask us anything before you pay</h3>
              <p>
                You can ask about cost by phone or WhatsApp without booking a consultation. You do
                not need to know which treatment you need in order to ask what it costs.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-pad soft-section" id="planner">
        <div className="shell costs-teaser-inner">
          <div>
            <span className="eyebrow">Free planner</span>
            <h2>Before you pay any clinic, <em>read this.</em></h2>
            <p className="section-copy">We wrote the guide we would want a member of our own family to have: where the money goes, the questions to ask any clinic, and the warning signs. Take it to any clinic, including ours.</p>
            <Link className="button button-primary" href="/planner">Open the fertility cost planner</Link>
          </div>
          <ul className="costs-teaser-list">
            <li><strong>On the quote</strong><span>What is, and is not, included</span></li>
            <li><strong>On success rates</strong><span>How to read the numbers honestly</span></li>
            <li><strong>On the plan</strong><span>Why this treatment, and who you will see</span></li>
            <li><strong>Warning signs</strong><span>What should make you pause before paying</span></li>
          </ul>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell simple-cta-card">
          <div>
            <span className="eyebrow">Still working out where to start?</span>
            <h2>A consultation is {currency(30000)}, and you leave knowing what you are facing.</h2>
          </div>
          <div>
            <Link className="button button-primary" href="/book">
              Book a consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
