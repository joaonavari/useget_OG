'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BotaoWhatsApp } from '@/components/ui/BotaoWhatsApp';
import { Icon } from '@/components/ui/Icon';
import { mensagens } from '@/lib/whatsapp';
import type { Categoria, Produto } from '@/types/catalogo';

type Props = {
  produto: Produto;
  categoria: Pick<Categoria, 'nome' | 'nomeCurto'>;
};

/**
 * Parte interativa da página do produto: fotos, escolha de cor e botões de pedido.
 * A cor escolhida muda a foto e entra na mensagem do WhatsApp.
 */
export function DetalhesProduto({ produto, categoria }: Props) {
  const [varianteId, setVarianteId] = useState(produto.variantes[0].id);
  const [fotoIndice, setFotoIndice] = useState(0);
  const variante = produto.variantes.find((v) => v.id === varianteId) ?? produto.variantes[0];
  const foto = variante.imagens[fotoIndice] ?? variante.imagens[0];
  const comCores = produto.variantes.length > 1;

  const mensagem = mensagens.produto(produto, categoria, variante);
  const rastreio = { produto: produto.nome, variante: variante.nome, categoria: categoria.nome };

  // Enquanto a página está na tela, reserva espaço no rodapé para a barra fixa do celular.
  useEffect(() => {
    document.body.classList.add('com-barra-pedido');
    return () => document.body.classList.remove('com-barra-pedido');
  }, []);

  function escolherVariante(id: string) {
    setVarianteId(id);
    setFotoIndice(0);
  }

  return (
    <>
      <div className="grid gap-8 md:grid-cols-[1.15fr_1fr] md:items-start md:gap-12 lg:gap-16">
        {/* Fotos */}
        <div className="md:sticky md:top-[calc(var(--header-height)+24px)]">
          <div className="relative aspect-[1143/846] overflow-hidden rounded-card bg-media md:rounded-card-lg">
            {foto && (
              <Image
                key={foto.src}
                src={foto.src}
                alt={foto.alt}
                fill
                preload
                sizes="(max-width: 767px) calc(100vw - 40px), 620px"
                className="animate-[trocar-foto_380ms_ease] object-cover"
              />
            )}
          </div>
          {variante.imagens.length > 1 && (
            <div className="mt-3 flex gap-3 overflow-x-auto" role="group" aria-label="Fotos do produto">
              {variante.imagens.map((imagem, i) => (
                <button
                  key={imagem.src}
                  type="button"
                  onClick={() => setFotoIndice(i)}
                  aria-label={`Ver foto ${i + 1} de ${variante.imagens.length}`}
                  aria-pressed={i === fotoIndice}
                  className="relative aspect-[1143/846] w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl bg-media opacity-60 transition-opacity aria-pressed:opacity-100 aria-pressed:ring-2 aria-pressed:ring-ink md:w-24"
                >
                  <Image src={imagem.src} alt="" fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Informações */}
        <div>
          <p className="mb-2 text-[13px] font-semibold text-destaque">{categoria.nomeCurto ?? categoria.nome}</p>
          <h1 className="text-[clamp(34px,9vw,44px)] leading-[1.05] font-bold tracking-[-0.045em] md:text-[clamp(40px,4.5vw,56px)]">
            {produto.nome}
          </h1>
          <p className="mt-4 text-lg leading-[1.5] tracking-[-0.02em] text-pretty text-secondary md:text-[19px]">{produto.descricao}</p>

          {comCores && (
            <fieldset className="mt-7">
              <legend className="mb-3 text-[15px]">
                Cor: <strong className="font-semibold">{variante.nome}</strong>
              </legend>
              <div className="flex items-center gap-3" role="radiogroup" aria-label={`Cor da placa ${produto.nome}`}>
                {produto.variantes.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    role="radio"
                    aria-checked={v.id === variante.id}
                    aria-label={v.nome}
                    onClick={() => escolherVariante(v.id)}
                    className="size-9 cursor-pointer rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)] transition-shadow aria-checked:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12),0_0_0_3px_#fff,0_0_0_5px_var(--color-ink)]"
                    style={{ background: v.cor ?? '#999' }}
                  />
                ))}
              </div>
            </fieldset>
          )}

          {produto.destaques && produto.destaques.length > 0 && (
            <ul className="mt-7 grid gap-2.5">
              {produto.destaques.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-[1.45]">
                  <span className="fundo-gradiente mt-0.5 grid size-[22px] shrink-0 place-items-center rounded-full text-white">
                    <Icon nome="check" className="size-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-9 rounded-card bg-surface p-5 md:p-6">
            <BotaoWhatsApp mensagem={mensagem} rastreio={{ origem: 'produto', ...rastreio }} variante="whatsapp" className="w-full">
              Pedir pelo WhatsApp
            </BotaoWhatsApp>
            <p className="mt-3 text-center text-sm text-secondary">
              Consulte valores, prazos e condições direto com a gente.
            </p>
          </div>

          <dl className="mt-9 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-line pt-7">
            {produto.especificacoes.map((item) => (
              <div key={item.rotulo}>
                <dt className="mb-1 text-sm text-tertiary">{item.rotulo}</dt>
                <dd className="leading-[1.35] font-semibold tracking-[-0.02em]">{item.valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Barra fixa no celular: o botão de pedido fica sempre à mão. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/8 bg-white/90 px-5 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-sm leading-tight font-semibold">{produto.nome}</p>
            {comCores && <p className="text-[13px] leading-tight text-secondary">{variante.nome}</p>}
          </div>
          <BotaoWhatsApp
            mensagem={mensagem}
            rastreio={{ origem: 'produto-barra', ...rastreio }}
            variante="whatsapp"
            className="min-h-12 shrink-0 px-5 text-[15px]"
          >
            Pedir pelo WhatsApp
          </BotaoWhatsApp>
        </div>
      </div>
    </>
  );
}
