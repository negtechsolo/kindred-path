"use client";

import { useEffect } from "react";

const revealSelectors = [
  ".section-heading",
  ".section-copy",
  ".treatment-card",
  ".team-card",
  ".resource-grid article",
  ".article-card",
  ".pathway-grid article",
  ".department-grid article",
  ".content-section",
  ".contact-cards a",
  ".story-image",
  ".science-image",
  ".support-image",
];

export function ExperienceEnhancer() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(document.querySelectorAll<HTMLElement>(revealSelectors.join(",")));
    items.forEach((item, index) => {
      item.classList.add("motion-reveal");
      item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
    });

    if (reduced) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const depthCards = Array.from(document.querySelectorAll<HTMLElement>(".team-card, .department-grid article"));
    const cleanups = depthCards.map((card) => {
      const move = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        card.style.setProperty("--card-ry", `${(px - 0.5) * 8}deg`);
        card.style.setProperty("--card-rx", `${(0.5 - py) * 8}deg`);
        card.style.setProperty("--card-x", `${px * 100}%`);
        card.style.setProperty("--card-y", `${py * 100}%`);
      };
      const leave = () => {
        card.style.setProperty("--card-ry", "0deg");
        card.style.setProperty("--card-rx", "0deg");
      };
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      return () => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", leave); };
    });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { rootMargin: "0px 0px -8%", threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));

    const setScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--scroll-progress", `${max > 0 ? window.scrollY / max : 0}`);
    };
    setScroll();
    window.addEventListener("scroll", setScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", setScroll);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
