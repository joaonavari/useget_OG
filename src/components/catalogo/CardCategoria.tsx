import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { urlCategoria, type CategoriaComTotal } from '@/lib/catalogo';

/** Cartão de categoria. Sem produtos, mostra o ícone e o selo "Em breve". */
export function CardCategoria({ categoria }: { categoria: CategoriaComTotal }) {
  const emBreve = categoria.totalProdutos === 0;
  const contagem = emBreve
    ? 'Nova linha'
    : `${categoria.totalProdutos} ${categoria.totalProdutos === 1 ? 'produto' : 'produtos'}`;

  return (
    <Link
      href={urlCategoria(categoria.slug)}
      className="group flex flex-col overflow-hidden rounded-card-lg bg-white transition-shadow duration-300 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.18)]"
    >
      <div className="relative aspect-[1143/846] overflow-hidden bg-media">
        {categoria.imagemCapa && !emBreve ? (
          <Image
            src={categoria.imagemCapa.src}
            alt={categoria.imagemCapa.alt}
            fill
            sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 50vw, 360px"
            className="object-cover transition-transform duration-700 ease-mola group-hover:scale-[1.03]"
          />
        ) : (
          <div className="fundo-aurora grid size-full place-items-center text-white">
            <Icon nome={categoria.icone} className="size-20 opacity-90 transition-transform duration-700 ease-mola group-hover:scale-105 md:size-24" />
          </div>
        )}
        {emBreve && (
          <span className="absolute top-4 left-4 rounded-full bg-white/15 px-3 py-1 text-[13px] font-semibold text-white backdrop-blur">
            Em breve
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-6 pt-6 pb-6 md:px-7 md:pt-7">
        <p className={`mb-1.5 text-[13px] font-semibold ${emBreve ? 'text-secondary' : 'text-destaque'}`}>{contagem}</p>
        <h3 className="text-[24px] leading-[1.15] tracking-[-0.03em]">{categoria.nome}</h3>
        <p className="mt-2.5 leading-[1.45] tracking-[-0.02em] text-secondary">{categoria.resumo}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 tracking-[-0.02em] text-link">
          {emBreve ? 'Saiba mais' : 'Ver produtos'}
          <Icon nome="seta" className="size-[18px] transition-transform group-hover:translate-x-[3px]" />
        </span>
      </div>
    </Link>
  );
}
