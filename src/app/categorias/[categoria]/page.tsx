import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CardProduto } from '@/components/catalogo/CardProduto';
import { EmBreve } from '@/components/catalogo/EmBreve';
import { secoesDeCategoria } from '@/components/secoes';
import { Contato } from '@/components/secoes/Contato';
import { Trilha } from '@/components/ui/Trilha';
import { getCategoria, getCategorias, getProdutosDaCategoria, urlCategoria } from '@/lib/catalogo';

/** Gera no build uma página para cada categoria do catálogo. */
export async function generateStaticParams() {
  const categorias = await getCategorias();
  return categorias.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: PageProps<'/categorias/[categoria]'>): Promise<Metadata> {
  const { categoria: slug } = await params;
  const categoria = await getCategoria(slug);
  if (!categoria) return {};
  const titulo = categoria.seo?.titulo ?? categoria.nome;
  const descricao = categoria.seo?.descricao ?? categoria.resumo;
  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: urlCategoria(categoria.slug) },
    openGraph: {
      title: titulo,
      description: descricao,
      url: urlCategoria(categoria.slug),
      ...(categoria.imagemCapa && { images: [{ url: categoria.imagemCapa.src, alt: categoria.imagemCapa.alt }] }),
    },
  };
}

export default async function PaginaCategoria({ params }: PageProps<'/categorias/[categoria]'>) {
  const { categoria: slug } = await params;
  const categoria = await getCategoria(slug);
  if (!categoria) notFound();

  const produtos = await getProdutosDaCategoria(categoria.slug);
  const temProdutos = produtos.length > 0;

  return (
    <>
      <section aria-labelledby="categoria-titulo" className="bg-surface pt-8 pb-20 md:pt-12 md:pb-30">
        <div className="container-site">
          <Trilha passos={[{ rotulo: 'Início', href: '/' }, { rotulo: categoria.nomeCurto ?? categoria.nome }]} />

          <header className="mt-8 mb-10 max-w-[760px] md:mt-12 md:mb-14">
            <h1 id="categoria-titulo" className="titulo-2 md:text-[clamp(40px,5.5vw,64px)]">
              {categoria.nome}
            </h1>
            <p className="mt-5 text-lg leading-[1.45] tracking-[-0.02em] text-pretty text-secondary md:text-[21px]">
              {categoria.descricao}
            </p>
          </header>

          {temProdutos ? (
            <div className="grid gap-5 md:grid-cols-2 md:gap-6">
              {produtos.map((produto) => (
                <CardProduto key={produto.id} produto={produto} titulo="h2" />
              ))}
            </div>
          ) : (
            <EmBreve categoria={categoria} />
          )}
        </div>
      </section>

      {temProdutos &&
        categoria.secoes?.map((nome) => {
          const Secao = secoesDeCategoria[nome];
          return <Secao key={nome} />;
        })}

      {/* Categorias "em breve" já têm o botão de WhatsApp no aviso. */}
      {temProdutos && (
        <div className="pt-14 md:pt-20">
          <Contato origem={`contato-${categoria.slug}`} />
        </div>
      )}
    </>
  );
}
