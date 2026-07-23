import Link from "next/link";

export function AffiliationBand() {
  return (
    <section className="affiliation-band">
      <div className="shell affiliation-inner">
        <div className="affiliation-copy">
          <span className="eyebrow light">Who we are</span>
          <h2>
            Kindred Path manages the <em>Institute of Fertility Medicine</em> at Lagos State
            University Teaching Hospital.
          </h2>
          <p>
            That is the whole sentence, and it is worth reading twice. This is not a private clinic
            that borrowed a hospital&rsquo;s name for its website. Kindred Path runs the Institute of
            Fertility Medicine at LASUTH, and the specialists who will see you hold consultant posts
            in its Department of Obstetrics and Gynaecology.
          </p>
          <p>
            It is also why consultants across Lagos refer their patients to us directly. We are the
            place other doctors send people.
          </p>
          <div className="affiliation-actions">
            <Link className="button button-light" href="/team">
              Meet the specialists
            </Link>
            <Link className="button button-ghost-light" href="/referrals">
              Refer a patient
            </Link>
          </div>
        </div>
        <ul className="affiliation-points">
          <li>
            <strong>Institute of Fertility Medicine, LASUTH</strong>
            <span>Managed by Kindred Path Fertility Centre</span>
          </li>
          <li>
            <strong>Teaching hospital consultants</strong>
            <span>Department of Obstetrics and Gynaecology</span>
          </li>
          <li>
            <strong>A referral destination</strong>
            <span>Accepting consultant referrals from across Lagos</span>
          </li>
          <li>
            <strong>Named, not anonymous</strong>
            <span>Every clinician listed with their post</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
