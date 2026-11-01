'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
export function WebsiteActivity() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.startsWith('/admin') || navigator.doNotTrack === '1') return;
    function track(event: string) {
      const payload = JSON.stringify({ event, path: pathname, referrer: document.referrer });
      if (navigator.sendBeacon) navigator.sendBeacon('/api/activity', new Blob([payload], { type: 'application/json' }));
      else fetch('/api/activity', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload, keepalive: true }).catch(() => {});
    }
    track('page_view');
    function click(event: MouseEvent) {
      const link = (event.target as Element)?.closest?.('a'); if (!link) return;
      const name = link.dataset.track || (link.protocol === 'tel:' ? 'call_click' : link.hostname === 'wa.me' ? 'whatsapp_click' : link.hasAttribute('download') ? 'planner_download' : '');
      if (name) track(name);
    }
    document.addEventListener('click', click); return () => document.removeEventListener('click', click);
  }, [pathname]);
  return null;
}
