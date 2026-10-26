import Image from 'next/image';
import { BotaoWhatsApp } from '@/components/ui/BotaoWhatsApp';
import { Icon } from '@/components/ui/Icon';
import { mensagens } from '@/lib/whatsapp';

const cartao =
  'absolute overflow-hidden rounded-[20px] bg-media shadow-[0_40px_80px_-30px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.04)] md:rounded-card-lg';

export function Hero() {
  return (
    <section aria-labelledby="hero-titulo" className="overflow-hidden pt-12 pb-10 text-center md:pt-[72px]">
      <div className="container-site">
        <p className="mb-[18px] text-[15px] font-semibold tracking-[-0.01em] text-secondary md:text-[17px]">
          Produtos com NFC + QR Code
        </p>
        <h1 id="hero-titulo" className="titulo-1 mx-auto max-w-[980px]">
          Um toque.
          <br />
          <span className="texto-gradiente">E o cliente chega lá.</span>
        </h1>
        <p className="mx-auto mt-[22px] max-w-[660px] text-lg leading-[1.45] tracking-[-0.02em] text-pretty text-secondary md:mt-7 md:text-[21px]">
          Placas de acrílico que levam seus clientes direto para <strong className="font-semibold text-ink">avaliar no Google</strong>,{' '}
          <strong className="font-semibold text-ink">seguir no Instagram</strong>,{' '}
          <strong className="font-semibold text-ink">chamar no WhatsApp</strong> ou{' '}
          <strong className="font-semibold text-ink">abrir o cardápio</strong>. E novas linhas chegando.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-2 md:mt-9 md:flex-row md:gap-7">
          <BotaoWhatsApp mensagem={mensagens.geral} rastreio={{ origem: 'hero' }} className="w-full max-w-[360px] md:w-auto">
            Pedir orçamento no WhatsApp
          </BotaoWhatsApp>
          <a href="#categorias" className="group inline-flex min-h-11 items-center gap-1.5 tracking-[-0.02em] text-link">
            Ver os produtos
            <Icon nome="seta" className="size-[18px] transition-transform group-hover:translate-x-[3px]" />
          </a>
        </div>
      </div>

      <div className="container-site">
        <figure
          aria-label="Placas USEGET de Instagram, avaliação no Google e WhatsApp"
          className="relative mx-auto mt-11 aspect-[1.55/1] w-full max-w-[1040px] md:mt-16 md:aspect-[2/1]"
        >
          <div
            className={`${cartao} top-[30%] -left-[12%] z-[1] aspect-[1143/846] w-[52%] animate-[abrir-esquerda_1.1s_var(--ease-mola)_.15s_both] md:top-[24%] md:left-0 md:w-[40%]`}
          >
            <Image
              src="/images/produtos/placa-instagram-1143.webp"
              alt="Placa USEGET Instagram em acrílico, com NFC e QR Code."
              fill
              sizes="(max-width: 767px) 52vw, 420px"
              className="object-cover"
              preload
            />
          </div>
          <div
            className={`${cartao} top-[30%] -right-[12%] z-[1] aspect-[1143/846] w-[52%] animate-[abrir-direita_1.1s_var(--ease-mola)_.15s_both] md:top-[24%] md:right-0 md:w-[40%]`}
          >
            <Image
              src="/images/produtos/placa-whatsapp-1143.webp"
              alt="Placa USEGET WhatsApp em acrílico, com NFC e QR Code."
              fill
              sizes="(max-width: 767px) 52vw, 420px"
              className="object-cover"
              preload
            />
          </div>
          <div
            className={`${cartao} top-0 left-[13%] z-[3] aspect-[1143/846] w-[74%] animate-[subir_1s_var(--ease-mola)_backwards] md:left-[22%] md:w-[56%]`}
          >
            <Image
              src="/images/produtos/placa-google-azul-1143.webp"
              alt="Placa USEGET Avalie no Google, azul, em acrílico com NFC e QR Code."
              fill
              sizes="(max-width: 767px) 74vw, 580px"
              className="object-cover"
              preload
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
