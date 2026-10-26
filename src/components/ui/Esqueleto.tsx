/**
 * Blocos cinza mostrados por um instante enquanto uma página de categoria ou
 * produto carrega na navegação dentro do site.
 */
const bloco = 'animate-pulse rounded-card bg-black/6';

export function EsqueletoCategoria() {
  return (
    <section aria-busy="true" aria-label="Carregando" className="bg-surface pt-8 pb-20 md:pt-12 md:pb-30">
      <div className="container-site">
        <div className={`${bloco} h-4 w-40 rounded-full`} />
        <div className={`${bloco} mt-8 h-12 w-3/4 max-w-[560px] md:mt-12 md:h-16`} />
        <div className={`${bloco} mt-5 mb-10 h-20 max-w-[760px] md:mb-14`} />
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          <div className={`${bloco} aspect-[1143/846] md:rounded-card-lg`} />
          <div className={`${bloco} hidden aspect-[1143/846] md:block md:rounded-card-lg`} />
        </div>
      </div>
    </section>
  );
}

export function EsqueletoProduto() {
  return (
    <section aria-busy="true" aria-label="Carregando" className="pt-6 pb-20 md:pt-10 md:pb-28">
      <div className="container-site">
        <div className={`${bloco} h-4 w-56 rounded-full`} />
        <div className="mt-6 grid gap-8 md:mt-10 md:grid-cols-[1.15fr_1fr] md:gap-12 lg:gap-16">
          <div className={`${bloco} aspect-[1143/846] md:rounded-card-lg`} />
          <div>
            <div className={`${bloco} h-4 w-24 rounded-full`} />
            <div className={`${bloco} mt-3 h-12 w-4/5`} />
            <div className={`${bloco} mt-5 h-28`} />
            <div className={`${bloco} mt-9 h-24`} />
          </div>
        </div>
      </div>
    </section>
  );
}
