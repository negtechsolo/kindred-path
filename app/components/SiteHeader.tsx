"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contact } from "../data";

const nav: [string, string][] = [
  ["Home", "/"],
  ["About", "/about"],
  ["Treatments", "/treatments"],
  ["Costs", "/costs"],
  ["Planner", "/planner"],
  ["Our team", "/team"],
  ["Stories", "/stories"],
  ["Resources", "/resources"],
  ["Contact", "/contact"],
  ["Refer", "/referrals"],
];

/** "/" only matches exactly; everything else matches its subtree. */
function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      className="brand"
      href="/"
      onClick={onNavigate}
      aria-label="Kindred Path Fertility Centre home"
    >
      <span className="brand-mark-wrap" aria-hidden="true">
        <img src="/images/kindred-path-mark-compact.webp" alt="" />
      </span>
      <span className="brand-copy">
        <strong>Kindred Path</strong>
        <span>Fertility Centre</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Stop the page scrolling behind an open drawer, and close on Escape.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

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
        <div className="header-partnership">
          <Brand />
          <div className="header-partner" aria-label="In partnership with IFM LASUTH, Institute of Fertility Medicine at Lagos State University Teaching Hospital">
            <img src="/images/ifm-lasuth.webp" width="44" height="52" alt="LASUTH crest" />
            <span>In partnership with<strong>IFM LASUTH</strong></span>
          </div>
        </div>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, href]) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={active ? "is-current" : undefined}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <Link className="button button-primary header-cta" href="/book">
          Book a consultation <span aria-hidden="true">↗</span>
        </Link>

        <button
          type="button"
          className={open ? "menu-toggle is-open" : "menu-toggle"}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div
        className={open ? "menu-scrim is-open" : "menu-scrim"}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <nav
        id="mobile-nav"
        className={open ? "mobile-drawer is-open" : "mobile-drawer"}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        <div className="drawer-head">
          <strong>Menu</strong>
          <button
            type="button"
            className="drawer-close"
            aria-label="Close navigation"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          />
        </div>
        <div className="drawer-links">
          {nav.map(([label, href]) => {
            const active = isActive(pathname, href);
            return (
              /* Native anchors: the drawer must navigate even if React has not
                 finished hydrating, which was swallowing the first tap. */
              <a
                key={href}
                href={href}
                className={active ? "is-current" : undefined}
                aria-current={active ? "page" : undefined}
                tabIndex={open ? 0 : -1}
              >
                <span>{label}</span>
                <em aria-hidden="true">→</em>
              </a>
            );
          })}
        </div>
        <div className="drawer-foot">
          <a className="button button-primary" href="/book" tabIndex={open ? 0 : -1}>
            Book a consultation
          </a>
          <a href={`tel:${contact.phoneHref}`} tabIndex={open ? 0 : -1}>
            {contact.phoneDisplay}
          </a>
        </div>
      </nav>
    </header>
  );
}
