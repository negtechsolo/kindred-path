"use client";

import { useRef } from "react";

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);

  function move(event: React.PointerEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
    ref.current.style.setProperty("--tilt-x", `${x}px`);
    ref.current.style.setProperty("--tilt-y", `${y}px`);
    ref.current.style.setProperty("--tilt-rx", `${-y * 0.65}deg`);
    ref.current.style.setProperty("--tilt-ry", `${x * 0.65}deg`);
    ref.current.style.setProperty("--pointer-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    ref.current.style.setProperty("--pointer-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  }

  function reset() {
    ref.current?.style.setProperty("--tilt-x", "0px");
    ref.current?.style.setProperty("--tilt-y", "0px");
    ref.current?.style.setProperty("--tilt-rx", "0deg");
    ref.current?.style.setProperty("--tilt-ry", "0deg");
  }

  return (
    <div className="hero-visual" ref={ref} onPointerMove={move} onPointerLeave={reset}>
      <div className="cell cell-one" aria-hidden="true" />
      <div className="cell cell-two" aria-hidden="true" />
      <div className="hero-image-frame">
        <img src="/images/hero-consultation.webp" alt="A couple in a calm consultation with a fertility specialist" />
        <span className="hero-light" aria-hidden="true" />
      </div>
      <div className="hero-proof glass-card">
        <span className="proof-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <rect x="3" y="5" width="18" height="16" rx="4" />
            <path d="M3 10h18" />
            <path d="M8 3v4M16 3v4" />
            <path d="m9 15.4 2.1 2.1 4-4.3" />
          </svg>
        </span>
        <div><strong>A thoughtful first step</strong><span>Private consultation · Clear guidance</span></div>
      </div>
      <div className="orbit-line orbit-one" aria-hidden="true" />
      <div className="orbit-line orbit-two" aria-hidden="true" />
    </div>
  );
}
