/**
 * Configurações gerais do site. Este é o ÚNICO lugar com o número do WhatsApp,
 * o Instagram e o domínio. Mudou algo aqui, muda no site inteiro.
 */
export const siteConfig = {
  nome: 'USEGET',
  slogan: 'Um toque. E o cliente chega lá.',
  descricao:
    'Produtos com NFC e QR Code da USEGET, de Maringá/PR. Placas de acrílico que levam seus clientes direto para avaliar no Google, seguir no Instagram, chamar no WhatsApp ou abrir o cardápio.',
  cidade: 'Maringá/PR',

  /**
   * Endereço público do site, sem barra no final. Defina NEXT_PUBLIC_SITE_URL
   * no servidor (ex.: https://useget.com.br) para os links de compartilhamento.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),

  /** WhatsApp: código do país + DDD + número, só dígitos. */
  whatsapp: '5544999582080',

  instagram: {
    usuario: 'usegetnfc',
    url: 'https://www.instagram.com/usegetnfc/',
  },

  /**
   * Pixel da Meta (Facebook/Instagram). Fica desligado enquanto estiver vazio.
   * Para ligar, defina NEXT_PUBLIC_META_PIXEL_ID com o ID do Pixel.
   */
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '',
} as const;
