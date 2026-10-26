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

/**
 * Visualização de produto ("ViewContent" da Meta). Se o Pixel ainda estiver
 * carregando, tenta de novo uma vez depois de um instante.
 */
export function registrarVisualizacaoProduto(dados: { produto: string; categoria: string }) {
  if (typeof window === 'undefined') return;
  const enviar = () => {
    if (typeof window.fbq !== 'function') return false;
    window.fbq('track', 'ViewContent', { content_name: dados.produto, content_category: dados.categoria, content_type: 'product' });
    return true;
  };
  if (!enviar()) window.setTimeout(enviar, 1500);
}
