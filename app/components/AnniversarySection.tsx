import { campaignActive, BOOK_URL, ASK_URL } from '../../lib/campaign';
import { CampaignWindow } from './CampaignWindow';

export function AnniversarySection() {
  if (!campaignActive()) return null;
  return <CampaignWindow><section className="fertility-week" aria-labelledby="fertility-week-title">
    <div className="shell fertility-week-grid">
      <div className="fertility-week-copy">
        <div className="fertility-partners"><div className="fertility-kindred"><img src="/images/kindred-path-mark-compact.webp" alt=""/><span>Kindred Path<small>FERTILITY CENTRE</small></span></div><span className="fertility-partner-divider"/><img className="fertility-lasuth" src="/images/ifm-lasuth.webp" alt="Lagos State University Teaching Hospital"/></div>
        <span className="fertility-eyebrow">WORLD FERTILITY DAY 2026</span>
        <h2 id="fertility-week-title">Fertility <em>Awareness Week</em></h2>
        <p className="fertility-week-dates">2–8 November 2026</p>
        <p className="fertility-intro">A little clarity. A private conversation.<br/>A next step that feels right for you.</p>
        <p className="fertility-partnership">In partnership with <strong>IFM LASUTH</strong><span>Institute of Fertility Medicine, Lagos State University Teaching Hospital</span></p>
        <div className="fertility-offer"><strong>FREE 30-minute fertility consultations</strong><span>For individuals and couples. Virtual or on-site.</span></div>
        <div className="fertility-actions"><a className="fertility-book" href={BOOK_URL} data-track="campaign_book">Book a free consultation <span aria-hidden="true">↗</span></a><a className="fertility-ask" href={ASK_URL} data-track="campaign_ask">Ask a private question <span aria-hidden="true">↗</span></a></div>
        <p className="fertility-reassurance">Not ready to book? Ask with your details or stay anonymous.<br/>No appointment or treatment commitment required.</p>
      </div>
      <aside className="fertility-schedule" aria-label="Consultation schedule">
        <span className="fertility-schedule-label">YOUR TIME TO TALK</span><h3>Three days.<br/><em>Space for your questions.</em></h3>
        <div className="fertility-date-row">{[['Tue','03'],['Thu','05'],['Tue','10']].map(([day,date])=><div className="fertility-date" key={date}><span>{day}</span><strong>{date}</strong><span>November</span></div>)}</div>
        <p className="fertility-extra-day">Including an additional consultation day on 10 November.</p>
        <div className="fertility-schedule-details"><p><span aria-hidden="true">◷</span><span><strong>9:00 AM – 4:00 PM</strong><small>West Africa Time · 30-minute appointments</small></span></p><p><span aria-hidden="true">⌖</span><span><strong>Join virtually or visit us</strong><small>IFM LASUTH, SDG Building, Ikeja</small></span></p></div>
        <div className="fertility-schedule-footer"><span aria-hidden="true">✧</span> Questions welcomed. Privacy respected.</div>
      </aside>
    </div>
  </section></CampaignWindow>;
}
