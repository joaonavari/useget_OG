'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { siteConfig } from '@/config/site';

/** Só aceita IDs numéricos, para nada estranho entrar no script. */
const pixelId = /^\d+$/.test(siteConfig.metaPixelId) ? siteConfig.metaPixelId : '';

/**
 * Pixel da Meta (Facebook e Instagram).
 *
 * Fica desligado enquanto NEXT_PUBLIC_META_PIXEL_ID não estiver definido.
 * Ligado, registra:
 * - PageView em cada página (inclusive na navegação dentro do site);
 * - ViewContent nas páginas de produto (src/lib/analytics.ts);
 * - Contact nos cliques de WhatsApp (src/lib/analytics.ts).
 */
export function MetaPixel() {
  const caminho = usePathname();
  const primeiraVisita = useRef(true);

  // O script já registra a primeira página; aqui contam as navegações seguintes.
  useEffect(() => {
    if (!pixelId) return;
    if (primeiraVisita.current) {
      primeiraVisita.current = false;
      return;
    }
    window.fbq?.('track', 'PageView');
  }, [caminho]);

  if (!pixelId) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${pixelId}');fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img height="1" width="1" alt="" style={{ display: 'none' }} src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`} />
      </noscript>
    </>
  );
}
