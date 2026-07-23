import Link from "next/link";

export default function NotFound() {
  return <main id="main-content" className="not-found"><div><img src="/images/kindred-path-mark-compact.webp" alt="" /><span className="eyebrow">404 · Page not found</span><h1>This path does not lead anywhere yet.</h1><p>Return to the homepage or begin with a confidential consultation.</p><div className="button-row"><Link className="button button-primary" href="/">Return home</Link><Link className="button button-secondary" href="/book">Book a consultation</Link></div></div></main>;
}
