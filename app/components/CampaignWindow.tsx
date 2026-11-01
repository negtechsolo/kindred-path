'use client';
import { useEffect, useState, type ReactNode } from 'react';
import { campaignActive, CAMPAIGN_END } from '../../lib/campaign';
export function CampaignWindow({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(true);
  useEffect(() => {
    const check = () => setActive(campaignActive());
    check();
    const interval = setInterval(check, 15000);
    const timeout = setTimeout(check, Math.max(0, Math.min(CAMPAIGN_END - Date.now(), 2147483647)));
    window.addEventListener('focus', check);
    return () => { clearInterval(interval); clearTimeout(timeout); window.removeEventListener('focus', check); };
  }, []);
  return active ? children : null;
}
