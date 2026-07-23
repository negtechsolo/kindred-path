import type { Metadata } from "next";
import Link from "next/link";
import { team } from "../data";

export const metadata: Metadata = { title: "Our Fertility Team", description: "Meet the clinical, embryology, nursing and patient-support teams at Kindred Path Fertility Centre." };

const departments = [
  ["The nursing team", "Patient preparation, treatment coordination and day-to-day guidance.", "/images/nursing-team.webp"],
  ["The embryology team", "Laboratory expertise supporting assisted reproduction and cryopreservation.", "/images/embryology-team.webp"],
  ["Client service", "A welcoming first point of contact for enquiries, scheduling and practical support.", "/images/client-service-team.webp"],
  ["Administrative team", "The operational coordination that helps each patient journey run smoothly.", "/images/administrative-team.webp"],
];

export default function TeamPage() {
  return (
    <main id="main-content">
      <section className="page-hero team-hero"><div className="shell page-hero-grid"><div><span className="eyebrow light">Our multidisciplinary team</span><h1>Expertise you can trust. People you can <em>talk to.</em></h1><p>Your care is supported by clinicians, nurses, embryology professionals and patient-service teams working together.</p></div><div className="team-hero-collage"><img src="/images/nursing-team.webp" alt="Kindred Path nursing team" /><div><img src="/images/client-service-team.webp" alt="Kindred Path client service team" /><img src="/images/embryology-team.webp" alt="Kindred Path embryology team" /></div></div></div></section>

      <section className="section-pad"><div className="shell"><div className="section-heading row-heading"><div><span className="eyebrow">Clinical leadership & specialists</span><h2>Meet members of the care team.</h2></div><p>Titles and profiles shown here are based on information currently provided by the centre.</p></div><div className="team-grid full-team-grid">{team.map((member) => <article className="team-card" key={member.name}><div className="team-image"><img src={member.image} alt={member.name} /></div><span>{member.role}</span><h3>{member.name}</h3><p>{member.detail}</p></article>)}</div></div></section>

      <section className="section-pad soft-section"><div className="shell"><div className="section-heading centered"><span className="eyebrow">One team around each journey</span><h2>Care goes beyond the consultation room.</h2></div><div className="department-grid">{departments.map(([title, copy, image]) => <article key={title}><div><img src={image} alt={title} /></div><span>Kindred Path</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

      <section className="section-pad"><div className="shell simple-cta-card"><div><span className="eyebrow">A good first appointment begins with listening</span><h2>Speak with the team about your next step.</h2></div><div><Link className="button button-primary" href="/book">Book a consultation</Link><Link className="button button-secondary" href="/contact">Contact us</Link></div></div></section>
    </main>
  );
}
