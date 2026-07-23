import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "../components/Accordion";
import { contact, faqs } from "../data";
import { guides } from "../content";
import { articles } from "../articles";

export const metadata: Metadata = { title: "Fertility Resources", description: "Clear, patient-friendly fertility guidance, first-visit information and common questions from Kindred Path." };

export default function ResourcesPage() {
  return (
    <main id="main-content">
      <section className="page-hero resource-hero"><div className="shell narrow-page-hero"><span className="eyebrow light">Patient resources</span><h1>Clear information for <em>informed decisions.</em></h1><p>Fertility language can feel complicated. These starting points are designed to help you ask better questions and feel more prepared for consultation.</p></div><div className="resource-ribbon" aria-hidden="true"><span /><span /><span /></div></section>

      <section className="section-pad"><div className="shell"><div className="section-heading row-heading"><div><span className="eyebrow">Start learning</span><h2>Guidance for each stage.</h2></div><p>Educational information is a starting point. Your specialist should always explain how it relates to your circumstances.</p></div><div className="resource-grid">{guides.map((guide) => <article key={guide.number}><div className="resource-top"><span>{guide.number}</span><small>{guide.read}</small></div><span className="treatment-category">{guide.tag}</span><h3>{guide.title}</h3><p>{guide.excerpt}</p><Link href={`/resources/guides/${guide.slug}`}>Read the guide <span aria-hidden="true">→</span></Link></article>)}</div></div></section>

      <section className="section-pad soft-section"><div className="shell"><div className="section-heading row-heading"><div><span className="eyebrow">Fertility knowledge centre</span><h2>Helpful answers for real searches.</h2></div><p>Evidence-informed articles for people researching fertility care in Lagos and Nigeria.</p></div><div className="article-grid compact">{articles.slice(0,3).map((article)=><article className="article-card" key={article.slug}><span className="treatment-category">{article.category}</span><h2>{article.title}</h2><p>{article.excerpt}</p><Link href={`/resources/articles/${article.slug}`}>Read article →</Link></article>)}</div><div className="center-action"><Link className="button button-secondary" href="/resources/articles">Explore all 12 articles</Link></div></div></section>

      <section className="education-band"><div className="shell education-grid"><div><span className="eyebrow light">Kindred Path Fertility Education Series</span><h2>Practical conversations with fertility professionals.</h2><p>Join the interest list for future webinars and Q&amp;A sessions covering fertility assessment, IVF, male fertility and emotional wellbeing.</p><div className="button-row"><a className="button button-cream" href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hello Kindred Path, please add me to the fertility education and webinar interest list.")}`}>Join the interest list</a><Link className="button button-ghost-light" href="/contact">Ask a question</Link></div></div><div className="education-art" aria-hidden="true"><img src="/images/kindred-path-mark-compact.webp" alt="" /><i /><i /></div></div></section>

      <section className="section-pad faq-section"><div className="shell faq-grid"><div className="faq-intro"><span className="eyebrow">Frequently asked</span><h2>Start with what you need to know.</h2><p>We have replaced generic promises with answers that respect individual circumstances.</p><Link className="button button-primary" href="/book">Request a consultation</Link></div><Accordion items={faqs} /></div></section>
    </main>
  );
}
