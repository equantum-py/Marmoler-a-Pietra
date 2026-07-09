'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

type AnalyticsEvent = {
  event_type: 'page_view' | 'whatsapp_click';
  page_path: string;
  page_title?: string;
  page?: string;
  context?: string;
  element_label?: string;
  element_href?: string;
  device_type?: string;
  referrer?: string;
  visitor_id?: string;
  session_id?: string;
};

function shouldTrackPath(pathname: string) {
  if (!pathname) return false;

  return !(
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next')
  );
}

function getDeviceType() {
  if (typeof window === 'undefined') return 'unknown';

  const width = window.innerWidth;

  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';

  return 'desktop';
}

function getOrCreateStorageId(key: string) {
  if (typeof window === 'undefined') return '';

  const storage = key.includes('session') ? window.sessionStorage : window.localStorage;
  const existing = storage.getItem(key);

  if (existing) return existing;

  const value =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  storage.setItem(key, value);

  return value;
}

function getReferrer() {
  if (typeof document === 'undefined') return '';

  if (!document.referrer) return 'directo';

  try {
    const url = new URL(document.referrer);

    if (url.hostname === window.location.hostname) {
      return 'interno';
    }

    return url.hostname;
  } catch {
    return document.referrer.slice(0, 250);
  }
}

/**
 * CORRECCIÓN 4: Detectar contexto de la página
 * /materiales/calacatta → context: "material"
 * /proyectos/cocina-premium → context: "proyecto"
 * /contacto → context: "contacto"
 * / → context: "home"
 */
function getPageContext(pathname: string): string {
  if (pathname.startsWith('/materiales/')) return 'material';
  if (pathname.startsWith('/proyectos/')) return 'proyecto';
  if (pathname.startsWith('/contacto')) return 'contacto';
  if (pathname === '/') return 'home';

  return 'otro';
}

function sendAnalyticsEvent(event: AnalyticsEvent) {
  if (typeof window === 'undefined') return;

  const payload: AnalyticsEvent = {
    ...event,
    device_type: event.device_type || getDeviceType(),
    visitor_id: event.visitor_id || getOrCreateStorageId('pietra_visitor_id'),
    session_id: event.session_id || getOrCreateStorageId('pietra_session_id'),
    referrer: event.referrer || getReferrer(),
  };

  fetch('/api/analytics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => undefined);
}

function isWhatsappLink(href: string) {
  const normalized = href.toLowerCase();

  return (
    normalized.includes('wa.me') ||
    normalized.includes('whatsapp.com') ||
    normalized.includes('api.whatsapp.com')
  );
}

function getClickableLabel(element: HTMLAnchorElement) {
  const aria = element.getAttribute('aria-label');
  const text = element.innerText;

  return (aria || text || 'WhatsApp').trim().replace(/\s+/g, ' ').slice(0, 160);
}

export function AnalyticsTracker() {
  const pathname = usePathname();

  /**
   * CORRECCIÓN 3: usePathname() detecta cambios de ruta en Next.js App Router
   * Registra navegación como eventos independientes
   * Home → Materiales → Proyecto → Contacto (todos son page_view separados)
   */
  useEffect(() => {
    if (!pathname || !shouldTrackPath(pathname)) return;

    const fullPath = `${pathname}${window.location.search || ''}`;

    sendAnalyticsEvent({
      event_type: 'page_view',
      page_path: fullPath,
      page_title: document.title,
    });
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const link = target.closest('a[href]');

      if (!(link instanceof HTMLAnchorElement)) return;
      if (!isWhatsappLink(link.href)) return;

      /**
       * CORRECCIÓN 4: Incluir page + context en whatsapp_click
       * page: ruta actual donde se hizo clic
       * context: tipo de página (material, proyecto, contacto, etc)
       */
      const currentPath = `${pathname}${window.location.search || ''}`;
      const context = getPageContext(pathname);

      sendAnalyticsEvent({
        event_type: 'whatsapp_click',
        page: currentPath,
        page_path: currentPath,
        context: context,
        page_title: document.title,
        element_label: getClickableLabel(link),
        element_href: link.href,
      });
    }

    document.addEventListener('click', handleClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, [pathname]);

  return null;
}
