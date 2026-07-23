import type { Metadata } from "next";
import Link from "next/link";
import { TreatmentExplorer } from "../components/TreatmentExplorer";

export const metadata: Metadata = { title: "Fertility Treatments", description: "Explore fertility consultations, IVF, IUI, preservation, diagnostics, counselling and specialist services at Kindred Path." };

export default function TreatmentsPage() {
  return (
    <main id="main-content">
      <section className="page-hero treatments-hero"><div className="shell narrow-page-hero"><span className="eyebrow light">Treatments & services</span><h1>Care options shaped around <em>your circumstances.</em></h1><p>You do not need to choose a treatment before speaking with us. Explore what is available, then begin with a specialist consultation.</p><Link className="button button-cream" href="/book">Start with a consultation</Link></div><div className="treatment-hero-cells" aria-hidden="true"><i /><i /><i /><i /></div></section>

      <section className="section-pad treatment-library"><div className="shell"><div className="section-heading row-heading"><div><span className="eyebrow">Find a service</span><h2>Explore by stage or need.</h2></div><p>Every advanced service is subject to individual assessment, clinical suitability and informed consent.</p></div><TreatmentExplorer /></div></section>

      <section className="section-pad soft-section"><div className="shell"><div className="section-heading centered"><span className="eyebrow">How decisions are made</span><h2>A plan should follow evidence, not assumptions.</h2></div><div className="decision-grid"><article><span>01</span><h3>Understand the whole picture</h3><p>Your history, previous results, priorities and any partner factors are considered together.</p></article><article><span>02</span><h3>Investigate with purpose</h3><p>Tests and scans should answer a clear clinical question and guide the next decision.</p></article><article><span>03</span><h3>Discuss the real options</h3><p>Your specialist explains benefits, limitations, alternatives, timing and practical implications.</p></article><article><span>04</span><h3>Choose together</h3><p>You have room to ask questions and decide what feels appropriate for you.</p></article></div></div></section>

      <section className="section-pad"><div className="shell clinical-note"><div className="clinical-note-mark" aria-hidden="true">i</div><div><h2>A note about outcomes</h2><p>Fertility outcomes vary with age, diagnosis, treatment history and many other factors. Website figures should never be treated as a personal prediction. Your specialist can discuss your individual circumstances after assessment.</p></div><Link className="button button-secondary" href="/resources">Read patient guides</Link></div></section>
    </main>
  );
}
