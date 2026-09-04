"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const TARGET = new Date("2026-09-24T14:00:00+01:00").getTime();
const BOOK_URL = "https://september.ifmkindredpathfertilitycentre.com/?src=mainsite";

export function AnniversarySection() {
  const [t, setT] = useState<{ d: string; h: string; m: string; s: string }>({
    d: "--", h: "--", m: "--", s: "--",
  });

  useEffect(() => {
    const two = (n: number) => String(n).padStart(2, "0");
    const tick = () => {
      const diff = TARGET - Date.now();
      if (diff <= 0) {
        setT({ d: "0", h: "0", m: "0", s: "0" });
        return;
      }
      setT({
        d: String(Math.floor(diff / 86400000)),
        h: two(Math.floor((diff % 86400000) / 3600000)),
        m: two(Math.floor((diff % 3600000) / 60000)),
        s: two(Math.floor((diff % 60000) / 1000)),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section-pad home-anniv">
      <div className="shell home-anniv-inner">
        <div>
          <span className="eyebrow"><span aria-hidden="true">✦</span> One year of Kindred Path</span>
          <h2>A year of walking with families. To mark it, <em>your first consultation is free.</em></h2>
          <p>
            Through September, we are opening private 30-minute consultations every Thursday at no
            charge, for women, men and couples. In partnership with IFM LASUTH.
          </p>
          <Link className="button home-anniv-cta" href={BOOK_URL}>
            Book your free September consultation
          </Link>
          <div className="home-anniv-note">Limited slots. They close as they fill.</div>
        </div>
        <div>
          <div className="home-cd-grid" suppressHydrationWarning>
            <div className="home-cd-cell"><strong>{t.d}</strong><span>Days</span></div>
            <div className="home-cd-cell"><strong>{t.h}</strong><span>Hours</span></div>
            <div className="home-cd-cell"><strong>{t.m}</strong><span>Mins</span></div>
            <div className="home-cd-cell"><strong>{t.s}</strong><span>Secs</span></div>
          </div>
          <div className="home-cd-caption">until free consultations close on Thursday 24 September</div>
        </div>
      </div>
    </section>
  );
}
