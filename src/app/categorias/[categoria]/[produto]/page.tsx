import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { CardProduto } from '@/components/catalogo/CardProduto';
import { DetalhesProduto } from '@/components/produto/DetalhesProduto';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { EsqueletoProduto } from '@/components/ui/Esqueleto';
import { Trilha } from '@/components/ui/Trilha';
import { siteConfig } from '@/config/site';
import {
  getCategoria,
  getProduto,
  getProdutosDaCategoria,
  getTodosProdutos,
  urlCategoria,
  urlProduto,
} from '@/lib/catalogo';

/** Gera no build uma página para cada produto do catálogo. */
export async function generateStaticParams() {
  const produtos = await getTodosProdutos();
  return produtos.map((p) => ({ categoria: p.categoria, produto: p.slug }));
}

export async function generateMetadata({ params }: PageProps<'/categorias/[categoria]/[produto]'>): Promise<Metadata> {
  const { categoria: categoriaSlug, produto: produtoSlug } = await params;
  const [produto, categoria] = await Promise.all([getProduto(categoriaSlug, produtoSlug), getCategoria(categoriaSlug)]);
  if (!produto || !categoria) return {};

  const titulo = produto.seo?.titulo ?? `${produto.nome} · ${categoria.nome}`;
  const descricao = produto.seo?.descricao ?? `${produto.resumo} ${produto.descricao}`.slice(0, 160);
  const foto = produto.variantes[0]?.imagens[0];
  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: urlProduto(produto) },
    openGraph: {
      title: titulo,
      description: descricao,
      url: urlProduto(produto),
      ...(foto && { images: [{ url: foto.src, width: foto.largura, height: foto.altura, alt: foto.alt }] }),
    },
  };
}

/*
 * A leitura do endereço fica dentro de <Suspense>: na navegação pelo site, o
 * esqueleto aparece na hora e o conteúdo entra logo em seguida. Os produtos
 * conhecidos continuam gerados por completo no build.
 */
export default function PaginaProduto({ params }: PageProps<'/categorias/[categoria]/[produto]'>) {
  return (
    <Suspense fallback={<EsqueletoProduto />}>
      <ConteudoProduto params={params} />
    </Suspense>
  );
}

async function ConteudoProduto({ params }: { params: PageProps<'/categorias/[categoria]/[produto]'>['params'] }) {
  const { categoria: categoriaSlug, produto: produtoSlug } = await params;
  const [produto, categoria] = await Promise.all([getProduto(categoriaSlug, produtoSlug), getCategoria(categoriaSlug)]);
  if (!produto || !categoria) notFound();

  const outros = (await getProdutosDaCategoria(categoria.slug)).filter((p) => p.id !== produto.id);

  // Dados estruturados para o Google entender a página como um produto.
  const dadosEstruturados = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: produto.nome,
    description: produto.descricao,
    category: categoria.nome,
    brand: { '@type': 'Brand', name: siteConfig.nome },
    image: produto.variantes.flatMap((v) => v.imagens.map((i) => `${siteConfig.url}${i.src}`)),
    url: `${siteConfig.url}${urlProduto(produto)}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados).replace(/</g, '\\u003c') }}
      />

      <section className="pt-6 pb-20 md:pt-10 md:pb-28">
        <div className="container-site">
          <Trilha
            passos={[
              { rotulo: 'Início', href: '/' },
              { rotulo: categoria.nomeCurto ?? categoria.nome, href: urlCategoria(categoria.slug) },
              { rotulo: produto.nome },
            ]}
          />
          <div className="mt-6 md:mt-10">
            <DetalhesProduto produto={produto} categoria={{ nome: categoria.nome, nomeCurto: categoria.nomeCurto }} />
          </div>
        </div>
      </section>

      {outros.length > 0 && (
        <section aria-labelledby="outros-titulo" className="bg-surface py-20 md:py-28">
          <div className="container-site">
            <SectionHeading id="outros-titulo" sobretitulo={categoria.nome} titulo="Veja também." />
            <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {outros.map((p) => (
                <CardProduto key={p.id} produto={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
