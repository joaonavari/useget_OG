/**
 * Ícones em linha do site (os mesmos do site anterior, mais os de categoria).
 * Uso: <Icon nome="whatsapp" className="size-5" />
 */
import type { SVGProps } from 'react';

const contorno = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

const desenhos = {
  seta: <path d="M5 12h14m-6-6 6 6-6 6" {...contorno} strokeWidth={1.8} />,
  voltar: <path d="M19 12H5m6 6-6-6 6-6" {...contorno} strokeWidth={1.8} />,
  whatsapp: (
    <>
      <path
        d="M20.5 11.6a8.5 8.5 0 0 1-12.8 7.3L3 20.2l1.3-4.6A8.5 8.5 0 1 1 20.5 11.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.65}
        strokeLinejoin="round"
      />
      <path
        d="M8.3 7.5c-.4 0-.9.6-.9 1.2 0 2.8 3.1 6.2 6.4 6.8.7.1 1.5-.2 1.8-.7l.4-.8c.1-.2 0-.4-.2-.5l-1.8-.9c-.2-.1-.4 0-.5.1l-.6.7c-.1.1-.3.2-.5.1-1.3-.6-2.4-1.6-3-2.9-.1-.2 0-.4.1-.5l.6-.7c.1-.1.2-.3.1-.5l-.8-1.7c-.1-.3-.3-.7-.6-.7h-.5Z"
        fill="currentColor"
      />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth={1.7} />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth={1.7} />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </>
  ),
  nfc: (
    <g {...contorno} strokeWidth={1.7}>
      <path d="M8 8.5a5 5 0 0 1 0 7" />
      <path d="M11.5 6a8.5 8.5 0 0 1 0 12" />
      <path d="M15 3.5a12 12 0 0 1 0 17" />
    </g>
  ),
  check: <path d="m5 12.5 4.2 4.2L19 7" {...contorno} strokeWidth={2} />,
  // Categorias
  loja: (
    <g {...contorno}>
      <path d="M4 9.5 5.5 4h13L20 9.5" />
      <path d="M4.5 10.5V20h15v-9.5" />
      <path d="M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0" />
      <path d="M10 20v-5h4v5" />
    </g>
  ),
  fabrica: (
    <g {...contorno}>
      <path d="M3 20.5h18" />
      <path d="M4 20.5V10l5 3.2V10l5 3.2V10l5 3.2v7.3" />
      <path d="M4 10V4.5h3V12" />
      <path d="M8 17h2M13 17h2" />
    </g>
  ),
  pet: (
    <g {...contorno}>
      <circle cx="7" cy="8" r="1.8" />
      <circle cx="12" cy="5.5" r="1.8" />
      <circle cx="17" cy="8" r="1.8" />
      <path d="M12 11c-2.4 0-5.5 3.4-5.5 6a2.5 2.5 0 0 0 2.5 2.5c1.1 0 1.9-.6 3-.6s1.9.6 3 .6a2.5 2.5 0 0 0 2.5-2.5c0-2.6-3.1-6-5.5-6Z" />
    </g>
  ),
  // Segmentos
  mercado: (
    <g {...contorno}>
      <path d="M2.5 4h2.2l2.4 11a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 1.9-1.5L20.5 8H5.6" />
      <circle cx="9.5" cy="20" r="1.2" />
      <circle cx="17" cy="20" r="1.2" />
    </g>
  ),
  bar: (
    <g {...contorno}>
      <path d="M5 8h10v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z" />
      <path d="M15 10.5h2a2 2 0 0 1 2 2V15a2 2 0 0 1-2 2h-2" />
      <path d="M5 8a2.5 2.5 0 0 1 2.4-3.2 3 3 0 0 1 5.2 0A2.5 2.5 0 0 1 15 8" />
      <path d="M8.5 12v5.5M11.5 12v5.5" />
    </g>
  ),
  restaurante: (
    <g {...contorno}>
      <path d="M6 3v5.5a3 3 0 0 0 6 0V3" />
      <path d="M9 3v18" />
      <path d="M18 21V3c-2 1.4-3 4.4-3 8.5h3" />
    </g>
  ),
  roupa: (
    <g {...contorno}>
      <path d="M10 5.5a2 2 0 1 1 2 2V9L3.6 15.2a1.5 1.5 0 0 0 .9 2.8h15a1.5 1.5 0 0 0 .9-2.8L12 9" />
    </g>
  ),
  servicos: (
    <g {...contorno}>
      <circle cx="6" cy="6" r="2.8" />
      <circle cx="6" cy="18" r="2.8" />
      <path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12" />
    </g>
  ),
} as const;

export type NomeIcone = keyof typeof desenhos;

type IconProps = SVGProps<SVGSVGElement> & { nome: NomeIcone };

export function Icon({ nome, className = 'size-[18px]', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={`shrink-0 ${className}`} {...props}>
      {desenhos[nome]}
    </svg>
  );
}
