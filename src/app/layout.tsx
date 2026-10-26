import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';
import { Header, type ItemMenu } from '@/components/layout/Header';
import { WhatsAppFlutuante } from '@/components/layout/WhatsAppFlutuante';
import { siteConfig } from '@/config/site';
import { getCategorias, urlCategoria } from '@/lib/catalogo';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.nome} | Produtos NFC e QR Code`,
    template: `%s | ${siteConfig.nome}`,
  },
  description: siteConfig.descricao,
  applicationName: siteConfig.nome,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: siteConfig.nome,
    title: `${siteConfig.nome} | ${siteConfig.slogan}`,
    description: siteConfig.descricao,
    images: [{ url: '/images/useget-compartilhamento.png', width: 1200, height: 630, alt: 'Placas USEGET com NFC e QR Code' }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const categorias = await getCategorias();
  const menu: ItemMenu[] = [
    ...categorias.map((c) => ({ href: urlCategoria(c.slug), rotulo: c.nomeCurto ?? c.nome })),
    { href: '/#duvidas', rotulo: 'Dúvidas' },
  ];

  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="flex min-h-dvh flex-col font-sans">
        <a
          href="#conteudo"
          className="fixed top-3 left-3 z-[100] -translate-y-[300%] rounded-xl bg-white px-5 py-3 shadow-lg focus:translate-y-0"
        >
          Ir para o conteúdo
        </a>
        <Header itens={menu} />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer itens={menu} />
        <WhatsAppFlutuante />
        {/* Pixel da Meta: entra aqui na etapa de SEO e Pixel. */}
      </body>
    </html>
  );
}
