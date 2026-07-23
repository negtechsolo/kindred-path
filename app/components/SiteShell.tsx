import Link from "next/link";
import { contact } from "../data";
import { ExperienceEnhancer } from "./ExperienceEnhancer";
import { SocialLinks } from "./SocialLinks";

const nav = [
  ["Home", "/"],
  ["About", "/about"],
  ["Treatments", "/treatments"],
  ["Our team", "/team"],
  ["Resources", "/resources"],
  ["Contact", "/contact"],
];

function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Kindred Path Fertility Centre home">
      <span className="brand-mark-wrap" aria-hidden="true">
        <img src="/images/kindred-path-mark-compact.png" alt="" />
      </span>
      <span className="brand-copy">
        <strong>Kindred Path</strong>
        <span>Fertility Centre</span>
      </span>
    </Link>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="shell utility-inner">
          <span>Private, personalised fertility care in Ikeja</span>
          <div>
            <a href={`tel:${contact.phoneHref}`}>{contact.phoneDisplay}</a>
            <span aria-hidden="true">·</span>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
      </div>
      <div className="shell header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, href]) => (
            <Link href={href} key={href}>{label}</Link>
          ))}
        </nav>
        <Link className="button button-primary header-cta" href="/book">
          Book a consultation <span aria-hidden="true">↗</span>
        </Link>
        <details className="mobile-menu">
          <summary aria-label="Open navigation"><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            {nav.map(([label, href]) => (
              <Link href={href} key={href}>{label}</Link>
            ))}
            <Link className="button button-primary" href="/book">Book a consultation</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-cta">
        <div>
          <span className="eyebrow light">Your next step can be simple</span>
          <h2>Start with a confidential conversation.</h2>
        </div>
        <div className="footer-cta-actions">
          <Link className="button button-cream" href="/book">Request an appointment</Link>
          <a className="button button-ghost-light" href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hello Kindred Path, I would like to ask about a fertility consultation.")}`}>Chat on WhatsApp</a>
        </div>
      </div>
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Brand />
          <p>Compassionate fertility care, specialist guidance and reproductive medicine centred on the person, not just the treatment.</p>
          <div className="trust-note"><span aria-hidden="true">◇</span> Your enquiry is handled with discretion.</div>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/about">About us</Link>
          <Link href="/treatments">Treatments</Link>
          <Link href="/team">Our team</Link>
          <Link href="/resources">Patient resources</Link>
          <Link href="/resources/articles">Fertility articles</Link>
        </div>
        <div>
          <h3>Visit</h3>
          <p>{contact.address}</p>
          <p>{contact.hours}</p>
          <a href={`tel:${contact.phoneHref}`}>{contact.phoneDisplay}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <SocialLinks />
        </div>
        <div>
          <h3>Patient support</h3>
          <Link href="/book">Book a consultation</Link>
          <Link href="/contact">Contact the team</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Website terms</Link>
        </div>
      </div>
      <div className="shell legal-row">
        <span>© 2026 Kindred Path Fertility Centre.</span>
        <span>Website information is educational and does not replace medical advice.</span>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ExperienceEnhancer />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      {children}
      <Footer />
      <div className="floating-contact" aria-label="Quick contact">
        <a href={`tel:${contact.phoneHref}`} aria-label={`Call ${contact.phoneDisplay}`}>Call</a>
        <a className="wa" href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hello Kindred Path, I would like to ask about a fertility consultation.")}`} aria-label="Chat with Kindred Path on WhatsApp">WhatsApp</a>
      </div>
    </>
  );
}
