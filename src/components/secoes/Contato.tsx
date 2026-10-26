import Image from 'next/image';
import type { ReactNode } from 'react';
import { siteConfig } from '@/config/site';
import { BotaoWhatsApp } from '@/components/ui/BotaoWhatsApp';
import { Icon } from '@/components/ui/Icon';
import { classesBotao } from '@/components/ui/botao';
import { mensagens, whatsappFormatado } from '@/lib/whatsapp';

type Props = {
  titulo?: ReactNode;
  texto?: string;
  /** Mensagem pronta do WhatsApp. Padrão: mensagem geral. */
  mensagem?: string;
  /** De onde veio o clique (para o Pixel). */
  origem?: string;
};

/** Bloco preto de contato, no fim das páginas. */
export function Contato({
  titulo = (
    <>
      Leve a USEGET
      <br />
      para o seu negócio.
    </>
  ),
  texto = 'Fale com a gente para consultar valores, modelos e condições.',
  mensagem = mensagens.geral,
  origem = 'contato',
}: Props) {
  return (
    <section id="contato" aria-labelledby="contato-titulo" className="pt-6 pb-20 md:pt-10 md:pb-30">
      <div className="container-site rounded-card bg-black px-[22px] py-16 text-center text-[#f5f5f7] md:rounded-card-lg md:px-8 md:py-24">
        <Image src="/images/useget-icon.png" alt="" width={64} height={64} className="mx-auto mb-7 size-16 invert" />
        <h2 id="contato-titulo" className="text-[clamp(36px,9vw,44px)] leading-[1.06] font-bold tracking-[-0.045em] md:text-[clamp(40px,5.6vw,72px)]">
          {titulo}
        </h2>
        <p className="mx-auto mt-5 max-w-[520px] text-lg tracking-[-0.02em] text-dark-text md:text-[21px]">{texto}</p>
        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 md:flex-row md:items-center">
          <BotaoWhatsApp mensagem={mensagem} rastreio={{ origem }} variante="claro">
            Conversar no WhatsApp
          </BotaoWhatsApp>
          <a href={siteConfig.instagram.url} target="_blank" rel="noopener noreferrer" className={classesBotao('fantasma')}>
            <Icon nome="instagram" />@{siteConfig.instagram.usuario}
          </a>
        </div>
        <BotaoWhatsApp
          mensagem={mensagem}
          rastreio={{ origem: `${origem}-numero` }}
          icone={false}
          semEstilo
          className="mt-5.5 inline-block text-[15px] text-tertiary tabular-nums hover:text-white"
        >
          {whatsappFormatado}
        </BotaoWhatsApp>
      </div>
    </section>
  );
}
