import Link from 'next/link';
import { cacheLife } from 'next/cache';
import { siteConfig } from '@/config/site';
import { BotaoWhatsApp } from '@/components/ui/BotaoWhatsApp';
import { mensagens } from '@/lib/whatsapp';
import type { ItemMenu } from './Header';
import { Wordmark } from './Wordmark';

/** Ano atual no fuso de Brasília, recalculado uma vez por dia. */
async function AnoAtual() {
  'use cache';
  cacheLife('days');
  return new Intl.DateTimeFormat('pt-BR', { year: 'numeric', timeZone: 'America/Sao_Paulo' }).format(new Date());
}

const classeLink = 'inline-flex min-h-8 items-center text-sm text-nav transition-colors hover:text-ink';

export function Footer({ itens }: { itens: ItemMenu[] }) {
  return (
    <footer className="border-t border-line bg-surface py-9">
      <div className="container-site flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link href="/" aria-label="USEGET, voltar ao início">
          <Wordmark className="text-xl" />
        </Link>
        <nav aria-label="Rodapé" className="flex w-full flex-wrap gap-x-6 gap-y-1.5 md:ml-auto md:w-auto">
          {itens.map((item) => (
            <Link key={item.href} href={item.href} className={classeLink}>
              {item.rotulo}
            </Link>
          ))}
          <a href={siteConfig.instagram.url} target="_blank" rel="noopener noreferrer" className={classeLink}>
            Instagram
          </a>
          <BotaoWhatsApp mensagem={mensagens.geral} rastreio={{ origem: 'rodape' }} icone={false} semEstilo className={classeLink}>
            WhatsApp
          </BotaoWhatsApp>
        </nav>
        <p className="w-full text-xs text-tertiary">
          © <AnoAtual /> {siteConfig.nome} · {siteConfig.cidade}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
