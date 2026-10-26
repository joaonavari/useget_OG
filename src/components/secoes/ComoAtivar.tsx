import { SectionHeading } from '@/components/ui/SectionHeading';

const opcoes = [
  {
    selo: 'Opção 1',
    etiqueta: 'Mais prático',
    titulo: 'Chega pronta.',
    apoio: 'A gente configura e entrega a placa funcionando.',
    passos: [
      { titulo: 'Escolha a placa.', texto: 'Avaliação, Instagram, WhatsApp ou cardápio.' },
      { titulo: 'Mande o seu link.', texto: 'Do Google, perfil, WhatsApp ou cardápio.' },
      { titulo: 'Coloque no balcão.', texto: 'Ela já chega pronta para usar.' },
    ],
  },
  {
    selo: 'Opção 2',
    etiqueta: 'Em 1 minuto',
    titulo: 'Você mesmo ativa.',
    apoio: 'Sem técnico e sem instalar nada.',
    passos: [
      { titulo: 'Aproxime ou escaneie a placa nova.', texto: 'Abre na hora o site de ativação.' },
      { titulo: 'Digite o nome do seu negócio.', texto: 'O sistema encontra ele para você.' },
      { titulo: 'Coloque seu e-mail.', texto: 'Pronto, a placa já está funcionando.' },
    ],
  },
];

/** As duas formas de ativar as placas para comércios. A primeira fica em destaque. */
export function ComoAtivar() {
  return (
    <section id="como-ativar" aria-labelledby="como-ativar-titulo" className="py-20 md:pt-35 md:pb-30">
      <div className="container-site">
        <SectionHeading
          id="como-ativar-titulo"
          sobretitulo="Como ativar"
          titulo={
            <>
              Pronta para usar em
              <br className="hidden md:block" /> menos de um minuto.
            </>
          }
        />
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {opcoes.map((opcao, i) => {
            const escuro = i === 0;
            return (
              <article
                key={opcao.selo}
                className={`rounded-card border px-6 py-[30px] md:rounded-card-lg md:px-10 md:pt-10 md:pb-11 ${
                  escuro
                    ? 'border-ink bg-ink text-[#f5f5f7] shadow-[0_36px_60px_-30px_rgba(0,0,0,0.45)]'
                    : 'border-line bg-surface'
                }`}
              >
                <div className="mb-[22px] flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full px-3 py-[5px] text-[13px] font-semibold ${escuro ? 'bg-white/14 text-white' : 'bg-white text-ink'}`}
                  >
                    {opcao.selo}
                  </span>
                  <span className={`text-[13px] font-semibold ${escuro ? 'texto-gradiente' : 'text-secondary'}`}>{opcao.etiqueta}</span>
                </div>
                <h3 className="text-[clamp(28px,3vw,36px)] tracking-[-0.04em]">{opcao.titulo}</h3>
                <p className={`mt-2.5 text-lg tracking-[-0.02em] ${escuro ? 'text-dark-text' : 'text-secondary'}`}>{opcao.apoio}</p>
                <ol className="mt-7 grid">
                  {opcao.passos.map((passo, n) => (
                    <li
                      key={passo.titulo}
                      className={`grid grid-cols-[44px_1fr] gap-4 border-t py-[18px] leading-[1.45] tracking-[-0.015em] first:border-t-0 first:pt-0 ${
                        escuro ? 'border-white/12 text-dark-text' : 'border-line text-secondary'
                      }`}
                    >
                      <span className="fundo-gradiente grid size-11 place-items-center rounded-full text-lg font-bold text-white">
                        {n + 1}
                      </span>
                      <div>
                        <strong className={`mb-0.5 block text-[17px] font-semibold ${escuro ? 'text-white' : 'text-ink'}`}>
                          {passo.titulo}
                        </strong>
                        {passo.texto}
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
