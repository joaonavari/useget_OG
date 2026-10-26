/**
 * Links e mensagens prontas do WhatsApp. O número vem de src/config/site.ts.
 */
import { siteConfig } from '@/config/site';
import type { Categoria, Produto, Variante } from '@/types/catalogo';

const numero = siteConfig.whatsapp;

/**
 * Número usado no link wa.me.
 * Fora dos DDDs 11 a 19, 21, 22, 24, 27 e 28, o WhatsApp registra celulares sem o
 * 9 da frente, e o wa.me não encontra a conta quando ele está presente.
 * Exemplo: 5544999582080 vira 554499582080.
 */
const numeroDoLink = /^55(1[1-9]|2[1247-8])/.test(numero)
  ? numero
  : numero.replace(/^(55\d{2})9(\d{8})$/, '$1$2');

/** Número formatado para mostrar na tela: +55 (44) 99958-2080. */
export const whatsappFormatado = (() => {
  const nacional = numero.slice(4);
  return `+55 (${numero.slice(2, 4)}) ${nacional.slice(0, -4)}-${nacional.slice(-4)}`;
})();

export function linkWhatsApp(mensagem: string): string {
  return `https://wa.me/${numeroDoLink}?text=${encodeURIComponent(mensagem)}`;
}

const abertura = 'Olá! Vim pelo site da USEGET';

export const mensagens = {
  geral: `${abertura} e gostaria de saber mais sobre os produtos NFC.`,

  quantidade: `${abertura} e gostaria de consultar as condições para um pedido em quantidade.`,

  produto(produto: Pick<Produto, 'nome' | 'variantes'>, categoria: Pick<Categoria, 'nome'>, variante?: Variante) {
    const cor = variante && produto.variantes.length > 1 ? ` (${variante.nome})` : '';
    return `${abertura} e tenho interesse no produto ${produto.nome}${cor}, da categoria ${categoria.nome}. Pode me passar valores e condições?`;
  },

  categoria(categoria: Pick<Categoria, 'nome'>) {
    return `${abertura} e tenho interesse na linha ${categoria.nome}. Pode me avisar quando estiver disponível?`;
  },
};
