import { campaignActive, BOOK_URL, ASK_URL } from '../../lib/campaign';
import { CampaignWindow } from './CampaignWindow';
export function AnniversaryRibbon() {
  if (!campaignActive()) return null;
  return <CampaignWindow><div className="fertility-ribbon"><div className="shell"><span>Fertility Awareness Week <b>2–8 Nov</b></span><span className="fertility-ribbon-detail">Free consultations · 3, 5 & 10 Nov</span><a href={BOOK_URL} data-track="campaign_book">Book free ↗</a><a href={ASK_URL} data-track="campaign_ask">Ask anonymously ↗</a></div></div></CampaignWindow>;
}
