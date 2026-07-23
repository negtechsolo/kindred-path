import type { Metadata } from "next";
import Link from "next/link";
import { contact } from "../data";
import { currency, tariff, tariffNote, totalFor, worked } from "../pricing";
import { GuideGate } from "../components/GuideGate";

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

      <section className="section-pad soft-section">
        <div className="shell">
          <GuideGate>
            <div className="planner">
              <span className="eyebrow">Your planner</span>
              <h2>Before you pay any clinic, ask these.</h2>

              <h3>On the quote itself</h3>
              <ul>
                <li>
                  Does this figure include laboratory tests and medication, or is it the treatment
                  cycle only?
                </li>
                <li>What happens to the cost if my cycle is cancelled before egg retrieval?</li>
                <li>Is embryo freezing and storage included, and what does storage cost per year?</li>
                <li>Are there separate charges for anaesthesia, theatre, or the embryology lab?</li>
                <li>What would a second cycle cost, and is any part of it discounted?</li>
              </ul>

              <h3>On success rates</h3>
              <ul>
                <li>
                  Is your quoted rate a clinical pregnancy rate or a live birth rate? These are very
                  different numbers.
                </li>
                <li>Is it per cycle started, per egg retrieval, or per embryo transfer?</li>
                <li>What is the rate for someone of my age specifically?</li>
                <li>How many cycles is that figure based on, and over what period?</li>
              </ul>
              <p className="planner-note">
                If a clinic cannot answer these four questions clearly, the number they quoted you
                does not mean very much.
              </p>

              <h3>On the treatment plan</h3>
              <ul>
                <li>Why this treatment rather than a simpler or cheaper one?</li>
                <li>What did my test results specifically show that led to this recommendation?</li>
                <li>What are the realistic chances that this does not work?</li>
                <li>Who will I actually see at each appointment?</li>
              </ul>

              <h3>Warning signs worth taking seriously</h3>
              <ul>
                <li>Any guarantee of a baby. Nobody can offer this honestly.</li>
                <li>Pressure to decide or pay today.</li>
                <li>Add-on treatments presented as improving your chances without published evidence.</li>
                <li>A refusal to put costs in writing before you commit.</li>
                <li>Success rates quoted without an age band or a denominator.</li>
              </ul>

              <div className="planner-cta">
                <p>
                  You are welcome to take these questions to any clinic, including ours. That is the
                  point of them.
                </p>
                <div>
                  <Link className="button button-primary" href="/book">
                    Book a consultation
                  </Link>
                  <a
                    className="button button-ghost"
                    href={`https://wa.me/${contact.whatsapp}?text=${whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ask a question on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </GuideGate>
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
