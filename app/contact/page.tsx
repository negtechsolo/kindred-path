import type { Metadata } from "next";
import Link from "next/link";
import { contact } from "../data";
import { ContactForm } from "../components/ContactForm";
import { SocialLinks } from "../components/SocialLinks";

export const metadata: Metadata = { title: "Contact", description: "Contact Kindred Path Fertility Centre in Ikeja, Lagos by phone, WhatsApp or email." };

export default function ContactPage() {
  const whatsappMessage = encodeURIComponent("Hello Kindred Path, I would like to ask about a fertility consultation.");
  return (
    <main id="main-content">
      <section className="page-hero contact-hero"><div className="shell page-hero-grid"><div><span className="eyebrow light">Contact Kindred Path</span><h1>One private conversation can make the next step <em>clearer.</em></h1><p>Call, email or send a WhatsApp message. You do not need to share detailed medical information before speaking with the team.</p></div><div className="contact-hero-card"><span>Care team hours</span><strong>Monday to Friday</strong><em>8:00 AM to 4:00 PM</em><div><span className="status-dot" /> Enquiries welcomed</div></div></div></section>

      <section className="section-pad contact-section"><div className="shell contact-grid"><div className="contact-details"><span className="eyebrow">Get in touch</span><h2>Choose the contact method that feels easiest.</h2><div className="contact-cards"><a href={`tel:${contact.phoneHref}`}><span className="contact-icon">01</span><small>Call us</small><strong>{contact.phoneDisplay}</strong><em>Tap to call</em></a><a href={`https://wa.me/${contact.whatsapp}?text=${whatsappMessage}`}><span className="contact-icon">02</span><small>WhatsApp</small><strong>Chat with the care team</strong><em>Open a private conversation</em></a><a href={`mailto:${contact.email}`}><span className="contact-icon">03</span><small>Email us</small><strong>{contact.email}</strong><em>Send an email</em></a></div></div><div className="visit-card"><div className="map-art" aria-hidden="true"><i className="road one" /><i className="road two" /><i className="road three" /><span className="map-pin">●</span><small>Ikeja</small></div><div className="visit-copy"><span className="eyebrow">Visit the centre</span><h2>{contact.address}</h2><p>{contact.hours}</p><a className="button button-primary" href="https://www.google.com/maps/search/?api=1&query=1-5+Oba+Akinjobi+Way+Ikeja+Lagos" target="_blank" rel="noreferrer">Open in Maps <span aria-hidden="true">↗</span></a></div></div></div></section>

      <section className="section-pad soft-section"><div className="shell contact-reassurance"><div><span className="eyebrow">Before you contact us</span><h2>Your privacy matters from the first message.</h2></div><div><p><span>✓</span>Keep detailed medical history for your private consultation.</p><p><span>✓</span>Ask about appointment availability without knowing which treatment you need.</p><p><span>✓</span>For urgent medical symptoms, contact an emergency service or appropriate hospital.</p></div></div></section>

      <section className="social-band"><div className="shell social-band-inner"><div><span className="eyebrow light">Stay connected</span><h2>Follow Kindred Path.</h2><p>Fertility education, centre updates and supportive guidance.</p></div><SocialLinks /></div></section>
      <section className="section-pad"><div className="shell contact-form-wrap"><ContactForm /></div></section>
      <section className="section-pad"><div className="shell simple-cta-card"><div><span className="eyebrow">Ready to request a time?</span><h2>Use the guided appointment request.</h2></div><div><Link className="button button-primary" href="/book">Book a consultation</Link></div></div></section>
    </main>
  );
}
