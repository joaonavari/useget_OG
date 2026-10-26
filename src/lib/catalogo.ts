/**
 * Acesso ao catálogo.
 *
 * As páginas nunca leem src/data/catalogo.ts direto: elas sempre passam por estas
 * funções. Quando o catálogo for para o Supabase, só o corpo destas funções muda
 * (trocar a leitura da lista por uma consulta ao banco). As páginas continuam iguais.
 *
 * Todas são `async` e usam 'use cache' de propósito. Hoje os dados são uma lista
 * fixa, mas com o banco cada chamada vai virar uma consulta, e o cache evita
 * repetir a mesma consulta a cada visita.
 */
import { categorias, produtos } from '@/data/catalogo';
import type { Categoria, Produto } from '@/types/catalogo';

export type CategoriaComTotal = Categoria & { totalProdutos: number };

const ativo = (item: { ativo?: boolean }) => item.ativo !== false;
const porOrdem = (a: { ordem: number }, b: { ordem: number }) => a.ordem - b.ordem;

/** Categorias visíveis, em ordem, com quantos produtos cada uma tem. */
export async function getCategorias(): Promise<CategoriaComTotal[]> {
  'use cache';
  return categorias
    .filter(ativo)
    .sort(porOrdem)
    .map((categoria) => ({
      ...categoria,
      totalProdutos: produtos.filter((p) => ativo(p) && p.categoria === categoria.slug).length,
    }));
}

export async function getCategoria(slug: string): Promise<Categoria | undefined> {
  'use cache';
  return categorias.find((c) => ativo(c) && c.slug === slug);
}

/** Produtos visíveis de uma categoria, em ordem. */
export async function getProdutosDaCategoria(categoriaSlug: string): Promise<Produto[]> {
  'use cache';
  return produtos.filter((p) => ativo(p) && p.categoria === categoriaSlug).sort(porOrdem);
}

/** Um produto pelo endereço. Só encontra se a categoria também estiver visível. */
export async function getProduto(categoriaSlug: string, produtoSlug: string): Promise<Produto | undefined> {
  'use cache';
  const categoria = categorias.find((c) => ativo(c) && c.slug === categoriaSlug);
  if (!categoria) return undefined;
  return produtos.find((p) => ativo(p) && p.categoria === categoriaSlug && p.slug === produtoSlug);
}

/** Todos os produtos visíveis (usado para gerar as páginas e o sitemap). */
export async function getTodosProdutos(): Promise<Produto[]> {
  'use cache';
  const categoriasVisiveis = new Set(categorias.filter(ativo).map((c) => c.slug));
  return produtos.filter((p) => ativo(p) && categoriasVisiveis.has(p.categoria)).sort(porOrdem);
}

/** Endereço da página da categoria. */
export function urlCategoria(categoriaSlug: string): string {
  return `/categorias/${categoriaSlug}`;
}

/** Endereço da página do produto. */
export function urlProduto(produto: Pick<Produto, 'categoria' | 'slug'>): string {
  return `/categorias/${produto.categoria}/${produto.slug}`;
}
