"use client";

import { useState } from "react";

export function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div className={`accordion-item ${expanded ? "is-open" : ""}`} key={item.question}>
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? -1 : index)}
            >
              <span>{item.question}</span>
              <span className="accordion-icon" aria-hidden="true">{expanded ? "−" : "+"}</span>
            </button>
            <div className="accordion-panel" hidden={!expanded}>
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
