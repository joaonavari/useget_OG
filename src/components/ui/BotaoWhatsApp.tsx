'use client';

import type { ReactNode } from 'react';
import { registrarContatoWhatsApp, type DadosContato } from '@/lib/analytics';
import { linkWhatsApp } from '@/lib/whatsapp';
import { Icon } from './Icon';
import { classesBotao, type TamanhoBotao, type VarianteBotao } from './botao';

type Props = {
  mensagem: string;
  /** Usado para medir as conversões quando o Pixel estiver ligado. */
  rastreio: DadosContato;
  children: ReactNode;
  variante?: VarianteBotao;
  tamanho?: TamanhoBotao;
  className?: string;
  /** Mostra o ícone do WhatsApp antes do texto. Padrão: sim. */
  icone?: boolean;
  /** Para botões só com ícone. */
  ariaLabel?: string;
  /** Sem classes de botão (para links de texto). */
  semEstilo?: boolean;
};

/** Link que abre o WhatsApp com uma mensagem pronta. */
export function BotaoWhatsApp({
  mensagem,
  rastreio,
  children,
  variante = 'primario',
  tamanho = 'normal',
  className = '',
  icone = true,
  ariaLabel,
  semEstilo = false,
}: Props) {
  return (
    <a
      href={linkWhatsApp(mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={semEstilo ? className : classesBotao(variante, tamanho, className)}
      onClick={() => registrarContatoWhatsApp(rastreio)}
    >
      {icone && <Icon nome="whatsapp" className={tamanho === 'pequeno' ? 'size-4' : 'size-[18px]'} />}
      {children}
    </a>
  );
}
