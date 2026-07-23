"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { treatments, treatmentSlug } from "../data";

const categories = [
  "All",
  "Assisted conception",
  "Fertility preservation",
  "Testing & diagnostics",
  "Specialist procedures",
  "Support & access",
];

export function TreatmentExplorer() {
  const [active, setActive] = useState("All");
  const visible = useMemo(
    () => (active === "All" ? treatments : treatments.filter((item) => item.category === active)),
    [active],
  );

  return (
    <div>
      <div className="filter-tabs" aria-label="Filter treatments">
        {categories.map((category) => (
          <button
            className={active === category ? "active" : ""}
            key={category}
            type="button"
            aria-pressed={active === category}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="treatment-grid full-grid">
        {visible.map((treatment, index) => (
          <article className="treatment-card" key={treatment.title}>
            <div className="treatment-card-top">
              <span className="card-number">{String(index + 1).padStart(2, "0")}</span>
              {treatment.tag && <span className="mini-tag">{treatment.tag}</span>}
            </div>
            <span className="treatment-category">{treatment.category}</span>
            <h3>{treatment.title}</h3>
            <p>{treatment.description}</p>
            <Link href={`/treatments/${treatmentSlug(treatment.title)}`}>
              View service <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
