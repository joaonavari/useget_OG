import Link from 'next/link';
import { BotaoWhatsApp } from '@/components/ui/BotaoWhatsApp';
import { Icon } from '@/components/ui/Icon';
import { mensagens } from '@/lib/whatsapp';
import type { Categoria } from '@/types/catalogo';

/** Aviso para categorias que ainda não têm produtos. */
export function EmBreve({ categoria }: { categoria: Categoria }) {
  return (
    <div className="fundo-aurora rounded-card px-6 py-12 text-center text-white md:rounded-card-lg md:px-16 md:py-20">
      <span className="mx-auto mb-7 grid size-20 place-items-center rounded-full bg-white/12 md:size-24">
        <Icon nome={categoria.icone} className="size-10 md:size-12" />
      </span>
      <p className="mb-3 text-[15px] font-semibold text-white/75">Nova linha</p>
      <h2 className="text-[clamp(34px,9vw,56px)] leading-[1.06] font-bold tracking-[-0.045em]">Em breve.</h2>
      <p className="mx-auto mt-4 max-w-[520px] text-lg leading-[1.45] tracking-[-0.02em] text-white/82 md:text-[19px]">
        {categoria.textoEmBreve ??
          'Estamos preparando os produtos desta linha. Fale com a gente para saber das novidades primeiro.'}
      </p>
      <div className="mt-9 flex flex-col items-center justify-center gap-3 md:flex-row md:gap-6">
        <BotaoWhatsApp
          mensagem={mensagens.categoria(categoria)}
          rastreio={{ origem: 'em-breve', categoria: categoria.nome }}
          variante="claro"
          className="w-full max-w-[360px] md:w-auto"
        >
          Falar no WhatsApp
        </BotaoWhatsApp>
        <Link href="/#categorias" className="inline-flex min-h-11 items-center gap-1.5 text-white/85 hover:text-white">
          Ver outras linhas
          <Icon nome="seta" />
        </Link>
      </div>
    </div>
  );
}
