import type { Metadata } from "next";
import Link from "next/link";
import { contact } from "../data";
import { GuideGate } from "../components/GuideGate";

export const metadata: Metadata = {
  title: "The Fertility Cost Planner",
  description:
    "A free, printable planner of the questions to ask before you pay any fertility clinic: the quote, success rates, the treatment plan and the warning signs.",
  alternates: { canonical: "/planner" },
};

export default function PlannerPage() {
  const whatsapp = encodeURIComponent(
    "Hello Kindred Path, I have a question after reading the fertility cost planner."
  );

  return (
    <main id="main-content">
      <section className="legal-hero">
        <div className="shell">
          <span className="eyebrow light">Free planner</span>
          <h1>Before you pay any clinic, read this.</h1>
          <p>
            We published our prices. Then we wrote the guide we would want a member of our own family
            to have. Take it to any clinic, including ours.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell">
          <GuideGate>
            <div className="planner">
              <span className="eyebrow">Your planner</span>
              <h2>Before you pay any clinic, ask these.</h2>

              <h3>On the quote itself</h3>
              <ul>
                <li>Does this figure include laboratory tests and medication, or is it the treatment cycle only?</li>
                <li>What happens to the cost if my cycle is cancelled before egg retrieval?</li>
                <li>Is embryo freezing and storage included, and what does storage cost per year?</li>
                <li>Are there separate charges for anaesthesia, theatre, or the embryology lab?</li>
                <li>What would a second cycle cost, and is any part of it discounted?</li>
              </ul>

              <h3>On success rates</h3>
              <ul>
                <li>Is your quoted rate a clinical pregnancy rate or a live birth rate? These are very different numbers.</li>
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
                  <Link className="button button-primary" href="/book">Book a consultation</Link>
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
    </main>
  );
}
