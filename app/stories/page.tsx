import type { Metadata } from "next";
import Link from "next/link";
import { AffiliationBand } from "../components/AffiliationBand";

export const metadata: Metadata = {
  title: "Patient stories",
  description:
    "Real experiences of fertility treatment at Kindred Path Fertility Centre in Ikeja, Lagos, shared with permission.",
};

/**
 * TODO (REPLACE BEFORE LAUNCH) — Muyiwa: these are drafts written in the site's
 * voice so you can see the shape and edit rather than start from nothing.
 * They are NOT real patients and must not go live as they are.
 *
 * When you collect the real ones:
 *   1. Get written consent, and say on the form that it can be withdrawn later.
 *   2. First names only, or an initial. Never a surname or a photograph.
 *   3. Keep the failed cycle in. A story with only good news reads as marketing.
 *   4. Do not edit out the cost or the waiting. That is what readers came for.
 *   5. Never let a story imply a success rate.
 */
const stories = [
  {
    name: "Tolu and Segun",
    context: "IVF, second cycle",
    quote: "Nobody had told us the first one might not work. That was the hardest part.",
    body: [
      "We spent almost two years being told to relax and give it time. By the time we walked into a fertility clinic we had already convinced ourselves something was badly wrong with us.",
      "The tests came first, for both of us, which surprised my husband. He had assumed the problem was mine because that is what everyone around us assumed. It was not that simple, and knowing that changed how we talked to each other.",
      "Our first cycle did not work. I will not pretend that was anything other than devastating. What helped was that we had been told beforehand that it might not, so it did not feel like something had gone wrong that we were not warned about. The second cycle worked.",
      "What I would say to anyone starting is this: ask what happens if it does not work, before you begin. You need to hear that answer while you are still calm enough to take it in.",
    ],
  },
  {
    name: "Amaka",
    context: "Fertility assessment, treated without IVF",
    quote: "I had saved up for IVF. It turned out I did not need it.",
    body: [
      "I came in expecting to be told I needed IVF, because that is the only thing anyone ever talks about. I had been quietly saving for it for a year.",
      "The assessment found something treatable that nobody had looked for. The treatment I actually needed cost a fraction of what I had prepared myself to spend.",
      "I am telling this story because I nearly did not go for tests at all. I nearly went straight to asking about IVF prices. If I had, I would have paid for something I did not need.",
    ],
  },
];

export default function StoriesPage() {
  return (
    <main id="main-content">
      <section className="page-hero stories-hero">
        <div className="shell page-hero-grid">
          <div>
            <span className="eyebrow light">Patient stories</span>
            <h1>
              The parts people usually <em>leave out.</em>
            </h1>
            <p>
              Shared with permission, first names only. We have not removed the difficult parts,
              because the difficult parts are what you actually need to read.
            </p>
          </div>
          <div className="stories-hero-card">
            <span>A note on these stories</span>
            <strong>One person&rsquo;s experience is not a success rate.</strong>
            <em>
              These are individual journeys. They cannot tell you what will happen in yours.
            </em>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell story-list">
          {stories.map((story) => (
            <article key={story.name} className="story-card content-section">
              <header>
                <span className="eyebrow">{story.context}</span>
                <h2>{story.name}</h2>
              </header>
              <blockquote>{story.quote}</blockquote>
              <div className="story-body">
                {story.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <AffiliationBand />

      <section className="section-pad">
        <div className="shell simple-cta-card">
          <div>
            <span className="eyebrow">Would you share yours?</span>
            <h2>If treatment with us helped, telling someone else can too.</h2>
          </div>
          <div>
            <Link className="button button-primary" href="/contact">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
