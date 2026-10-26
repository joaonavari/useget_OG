import Link from 'next/link';
import { BotaoWhatsApp } from '@/components/ui/BotaoWhatsApp';
import { classesBotao } from '@/components/ui/botao';
import { mensagens } from '@/lib/whatsapp';

export default function NaoEncontrada() {
  return (
    <section className="container-site py-24 text-center md:py-36">
      <p className="mb-3.5 text-[15px] font-semibold text-secondary">Erro 404</p>
      <h1 className="titulo-2">
        Essa página <span className="texto-gradiente">não existe.</span>
      </h1>
      <p className="mx-auto mt-5 max-w-[520px] text-lg text-secondary">
        O endereço pode ter mudado. Volte para o início ou fale com a gente.
      </p>
      <div className="mt-9 flex flex-col items-center justify-center gap-3 md:flex-row">
        <Link href="/" className={classesBotao('primario', 'normal', 'w-full max-w-[360px] md:w-auto')}>
          Ir para o início
        </Link>
        <BotaoWhatsApp mensagem={mensagens.geral} rastreio={{ origem: '404' }} variante="whatsapp" className="w-full max-w-[360px] md:w-auto">
          Falar no WhatsApp
        </BotaoWhatsApp>
      </div>
    </section>
  );
}
