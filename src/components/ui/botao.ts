/**
 * Classes dos botões do site. Ficam numa função (e não num componente) para
 * servirem tanto em <Link> quanto em <a> e <button>.
 */
export type VarianteBotao = 'primario' | 'claro' | 'fantasma' | 'whatsapp';
export type TamanhoBotao = 'normal' | 'pequeno';

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-full border border-transparent font-medium tracking-[-0.02em] leading-tight whitespace-nowrap cursor-pointer transition-[background-color,color,border-color,transform] duration-200 ease-mola hover:-translate-y-px active:translate-y-px active:scale-[0.98]';

const variantes: Record<VarianteBotao, string> = {
  primario: 'bg-ink text-white hover:bg-[#3a3a3c]',
  claro: 'bg-white text-ink hover:bg-[#e8e8ed]',
  fantasma: 'text-white border-white/35 hover:border-white hover:bg-white/8',
  whatsapp: 'bg-whatsapp text-white hover:bg-[#1fb857]',
};

const tamanhos: Record<TamanhoBotao, string> = {
  normal: 'min-h-[52px] px-7 py-3.5 text-[17px]',
  pequeno: 'min-h-10 px-[18px] py-2 text-sm gap-[7px]',
};

export function classesBotao(variante: VarianteBotao = 'primario', tamanho: TamanhoBotao = 'normal', extra = '') {
  return `${base} ${variantes[variante]} ${tamanhos[tamanho]} ${extra}`.trim();
}
