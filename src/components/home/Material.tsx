import Image from 'next/image';

const especificacoes = [
  { rotulo: 'Tamanho', valor: '10 × 10 cm' },
  { rotulo: 'Material', valor: 'Acrílico cristal' },
  { rotulo: 'Impressão', valor: 'UV direto no material' },
  { rotulo: 'Tecnologia', valor: 'NFC integrado + QR Code dinâmico' },
];

/** Seção escura sobre o acabamento das placas. */
export function Material() {
  return (
    <section aria-labelledby="material-titulo" className="overflow-hidden bg-black py-22 text-[#f5f5f7] md:py-35">
      <div className="container-site grid items-center gap-x-16 gap-y-10 md:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="mb-3.5 text-[15px] font-semibold text-tertiary">Feita para o dia a dia</p>
          <h2 id="material-titulo" className="titulo-2">
            Acrílico cristal.
            <br />
            Impressão UV.
            <br />
            <span className="text-tertiary">Acabamento premium.</span>
          </h2>
          <p className="mt-6 max-w-[440px] text-lg leading-[1.45] tracking-[-0.02em] text-dark-text md:text-[21px]">
            A impressão é feita direto no acrílico, com cores vivas e um acabamento que valoriza o seu balcão.
          </p>
        </div>

        <figure
          aria-label="Placas USEGET de avaliação no Google, azul e preta"
          className="relative mx-auto aspect-[1.15/1] w-full max-w-[520px] md:max-w-none"
        >
          <div
            aria-hidden="true"
            className="absolute inset-[8%_0_0] bg-[radial-gradient(closest-side,rgba(10,124,255,0.45),rgba(122,77,255,0.18)_55%,transparent)] blur-[40px]"
          />
          <Image
            src="/images/produtos/recorte-google-azul.webp"
            alt="Placa USEGET Avalie no Google, azul."
            width={663}
            height={744}
            sizes="(max-width: 767px) 54vw, 320px"
            className="absolute top-[4%] left-[2%] z-[1] w-[54%] -rotate-7 drop-shadow-[0_40px_50px_rgba(0,0,0,0.7)]"
          />
          <Image
            src="/images/produtos/recorte-google-preta.webp"
            alt="Placa USEGET Avalie no Google, preta."
            width={663}
            height={744}
            sizes="(max-width: 767px) 54vw, 320px"
            className="absolute top-[12%] right-[2%] z-[2] w-[54%] rotate-5 drop-shadow-[0_40px_50px_rgba(0,0,0,0.7)]"
          />
        </figure>

        <dl className="col-span-full mt-4 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-dark-line pt-8 md:mt-10 md:pt-10 lg:grid-cols-4 lg:gap-6">
          {especificacoes.map((item) => (
            <div key={item.rotulo}>
              <dt className="mb-1.5 text-sm text-tertiary">{item.rotulo}</dt>
              <dd className="text-lg leading-[1.3] font-semibold tracking-[-0.025em] md:text-[21px]">{item.valor}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
