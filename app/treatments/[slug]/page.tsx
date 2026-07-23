import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { treatmentDetails } from "../../content";
import { treatments, treatmentSlug } from "../../data";

export const generateStaticParams = () => treatments.map((item) => ({ slug: treatmentSlug(item.title) }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const treatment = treatments.find((item) => treatmentSlug(item.title) === slug);
  if (!treatment) return {};
  return { title: `${treatment.title} in Lagos`, description: treatment.description };
}

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const treatment = treatments.find((item) => treatmentSlug(item.title) === slug);
  const detail = treatmentDetails.find((item) => item.slug === slug);
  if (!treatment || !detail) notFound();
  return <main id="main-content">
    <section className="content-hero"><div className="shell content-hero-inner"><nav className="breadcrumb"><Link href="/treatments">Treatments</Link><span>›</span><span>{treatment.title}</span></nav><span className="eyebrow light">{treatment.category}</span><h1>{treatment.title}</h1><p>{detail.overview}</p><div className="button-row"><Link className="button button-cream" href={`/book?service=${encodeURIComponent(treatment.title)}`}>Request a consultation</Link><Link className="button button-ghost-light" href="/contact">Ask the care team</Link></div></div></section>
    <section className="section-pad"><div className="shell detail-layout"><div className="detail-main"><section className="content-section"><span className="eyebrow">A personalised decision</span><h2>Who may discuss this service?</h2><ul className="check-list">{detail.consideredFor.map((item) => <li key={item}>{item}</li>)}</ul></section><section className="content-section"><span className="eyebrow">The pathway</span><h2>What the process can involve</h2><div className="process-grid">{detail.steps.map((step, index) => <article key={step.title}><span>{String(index + 1).padStart(2,"0")}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div></section><section className="content-section"><span className="eyebrow">Prepare for consultation</span><h2>Useful questions to ask</h2><ul className="question-list">{detail.questions.map((item) => <li key={item}>{item}</li>)}</ul></section></div><aside className="detail-aside"><h2>Important to know</h2><p>Suitability, timing, risks and expected outcomes depend on your individual assessment. This page is educational and does not replace medical advice.</p><Link className="button button-primary" href={`/book?service=${encodeURIComponent(treatment.title)}`}>Speak with a specialist</Link><Link href="/resources">Read patient guidance →</Link></aside></div></section>
    <section className="section-pad soft-section"><div className="shell"><div className="section-heading"><span className="eyebrow">Keep exploring</span><h2>Other treatments and services.</h2><p className="section-copy">You do not have to go back to start again. Every service we offer is one click away.</p></div><div className="related-grid">{treatments.filter((item)=>treatmentSlug(item.title)!==slug).slice(0,4).map((item)=><Link key={item.title} className="related-card" href={`/treatments/${treatmentSlug(item.title)}`}><strong>{item.title}</strong><span>{item.description}</span><em>Read more →</em></Link>)}</div><p className="related-more"><Link href="/treatments">View all treatments and services →</Link></p></div></section>
  </main>;
}
