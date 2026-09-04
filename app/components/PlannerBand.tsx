import Link from "next/link";

export function PlannerBand() {
  return (
    <section className="planner-band">
      <div className="shell planner-band-inner">
        <div className="planner-band-doc" aria-hidden="true">
          <span className="planner-doc-tag">PDF · 5 pages</span>
          <div className="planner-doc-page">
            <strong>The questions to ask before you pay for anything.</strong>
            <i /><i /><i />
            <div className="planner-doc-bar">
              <span /><span /><span /><span />
            </div>
            <i /><i />
          </div>
        </div>
        <div className="planner-band-copy">
          <span className="eyebrow light">Free, no strings</span>
          <h2>
            Before you pay any clinic, <em>read this.</em>
          </h2>
          <p>
            We published our prices. Then we went further and wrote the guide we would want a member
            of our own family to have: where the money actually goes, the nine questions to ask any
            clinic, the five warning signs, and what to bring to a first appointment.
          </p>
          <p className="planner-band-note">
            Take it to our competitors. That is genuinely the point of it.
          </p>
          <Link className="button button-light" href="/planner">
            Get the planner
          </Link>
        </div>
      </div>
    </section>
  );
}
