import { BotaoWhatsApp } from '@/components/ui/BotaoWhatsApp';
import { mensagens } from '@/lib/whatsapp';

/** Chamada para pedidos maiores. */
export function PedidoQuantidade() {
  return (
    <section aria-labelledby="quantidade-titulo" className="pt-20 pb-6 md:pt-30 md:pb-10">
      <div className="container-site">
        <div className="fundo-aurora flex flex-col items-start gap-10 rounded-card px-[26px] py-10 text-white md:rounded-card-lg md:px-10 md:py-12 lg:flex-row lg:items-center lg:justify-between lg:p-16">
          <div>
            <p className="mb-3.5 text-[15px] font-semibold text-white/75">Pedidos em quantidade</p>
            <h2 id="quantidade-titulo" className="text-[clamp(30px,8vw,48px)] leading-[1.06] font-bold tracking-[-0.045em]">
              Vai equipar várias mesas
              <br className="hidden md:block" /> ou unidades?
            </h2>
            <p className="mt-4 max-w-[480px] text-lg tracking-[-0.02em] text-white/82 md:text-[19px]">
              Temos condições especiais para pedidos maiores. Conte quantas unidades você precisa.
            </p>
          </div>
          <BotaoWhatsApp
            mensagem={mensagens.quantidade}
            rastreio={{ origem: 'quantidade' }}
            variante="claro"
            className="w-full lg:w-auto"
          >
            Consultar condições
          </BotaoWhatsApp>
        </div>
      </div>
    </section>
  );
}
