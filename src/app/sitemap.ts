import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getCategorias, getTodosProdutos, urlCategoria, urlProduto } from '@/lib/catalogo';

/** Lista de páginas para o Google (/sitemap.xml). Atualiza sozinha com o catálogo. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categorias, produtos] = await Promise.all([getCategorias(), getTodosProdutos()]);
  return [
    { url: siteConfig.url, priority: 1 },
    ...categorias.map((c) => ({ url: `${siteConfig.url}${urlCategoria(c.slug)}`, priority: 0.8 })),
    ...produtos.map((p) => ({ url: `${siteConfig.url}${urlProduto(p)}`, priority: 0.7 })),
  ];
}
