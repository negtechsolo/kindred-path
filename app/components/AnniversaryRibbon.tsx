"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const TARGET = new Date("2026-09-24T14:00:00+01:00").getTime();
const BOOK_URL = "https://september.ifmkindredpathfertilitycentre.com/?src=mainsite";

export function AnniversaryRibbon() {
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    const two = (n: number) => String(n).padStart(2, "0");
    const tick = () => {
      const diff = TARGET - Date.now();
      if (diff <= 0) {
        setLabel("closed");
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setLabel(`${d}d ${two(h)}h ${two(m)}m`);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="anniv-ribbon">
      <div className="shell anniv-ribbon-inner">
        <span><b>Kindred Path turns one this September.</b></span>
        <span className="anniv-ribbon-dot" aria-hidden="true">·</span>
        <span>
          Free consultations end in{" "}
          <span className="anniv-ribbon-cd" suppressHydrationWarning>{label || "…"}</span>
        </span>
        <Link href={BOOK_URL}>Book free</Link>
      </div>
    </div>
  );
}
