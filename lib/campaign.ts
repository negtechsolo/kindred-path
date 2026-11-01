export const CAMPAIGN_END = Date.parse('2026-11-11T00:00:00+01:00');
export const CAMPAIGN_URL = 'https://fertilityday.ifmkindredpathfertilitycentre.com';
export const BOOK_URL = `${CAMPAIGN_URL}/book?utm_source=main_website&utm_medium=referral&utm_campaign=fertility_week_2026`;
export const ASK_URL = `${CAMPAIGN_URL}/?utm_source=main_website&utm_medium=referral&utm_campaign=fertility_week_2026#ways`;
export function campaignActive(now = Date.now()) { return now < CAMPAIGN_END; }
