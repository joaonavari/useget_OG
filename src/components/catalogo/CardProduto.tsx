import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { urlProduto } from '@/lib/catalogo';
import type { Produto } from '@/types/catalogo';

/** Cartão de produto nas listas. Leva para a página do produto. */
export function CardProduto({ produto, titulo = 'h3' }: { produto: Produto; titulo?: 'h2' | 'h3' }) {
  const Titulo = titulo;
  const foto = produto.variantes[0]?.imagens[0];
  const comCores = produto.variantes.length > 1;

  return (
    <Link
      href={urlProduto(produto)}
      className="group flex flex-col overflow-hidden rounded-card-lg bg-white transition-shadow duration-300 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.18)]"
    >
      <div className="relative aspect-[1143/846] overflow-hidden bg-media">
        {foto && (
          <Image
            src={foto.src}
            alt={foto.alt}
            fill
            sizes="(max-width: 767px) calc(100vw - 40px), 560px"
            className="object-cover transition-transform duration-700 ease-mola group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col px-6 pt-6 pb-[26px] md:px-8 md:pt-7 md:pb-8">
        <Titulo className="text-[26px] leading-[1.15] tracking-[-0.03em] md:text-[28px]">{produto.nome}</Titulo>
        <p className="mt-2.5 leading-[1.45] tracking-[-0.02em] text-secondary md:text-[17px]">{produto.resumo}</p>
        {comCores && (
          <p className="mt-5 flex items-center gap-2">
            {produto.variantes.map((v) => (
              <span
                key={v.id}
                aria-hidden="true"
                className="size-5 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]"
                style={{ background: v.cor ?? '#999' }}
              />
            ))}
            <span className="ml-1 text-sm text-secondary">
              {produto.variantes.length} cores<span className="sr-only">: {produto.variantes.map((v) => v.nome).join(' e ')}</span>
            </span>
          </p>
        )}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 tracking-[-0.02em] text-link">
          Ver detalhes
          <Icon nome="seta" className="size-[18px] transition-transform group-hover:translate-x-[3px]" />
        </span>
      </div>
    </Link>
  );
}
