/**
 * Eventos de conversão (Pixel da Meta).
 *
 * Enquanto o Pixel não estiver configurado (src/config/site.ts), estas funções
 * não fazem nada. Depois de ligar o Pixel, os eventos passam a ser enviados
 * sozinhos, sem mudar os botões.
 */

type Fbq = (comando: 'track' | 'trackCustom', evento: string, dados?: Record<string, unknown>) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

/** Dados enviados quando alguém clica para falar no WhatsApp. */
export type DadosContato = {
  /** De onde veio o clique, por exemplo "produto", "cabecalho", "em-breve". */
  origem: string;
  produto?: string;
  variante?: string;
  categoria?: string;
};

export function registrarContatoWhatsApp(dados: DadosContato) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  // "Contact" é um evento padrão da Meta, útil para otimizar anúncios.
  window.fbq('track', 'Contact', {
    content_name: dados.produto,
    content_category: dados.categoria,
    ...dados,
  });
}
