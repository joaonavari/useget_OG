import { Icon, type NomeIcone } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';

const segmentos: { icone: NomeIcone; nome: string; texto: string; placas: string[] }[] = [
  { icone: 'mercado', nome: 'Mercados', texto: 'No caixa, quem acabou de ser bem atendido avalia em segundos.', placas: ['Avaliação', 'WhatsApp'] },
  { icone: 'loja', nome: 'Conveniências', texto: 'Cliente rápido, toque rápido: avaliação ou Instagram na hora de pagar.', placas: ['Avaliação', 'Instagram'] },
  { icone: 'bar', nome: 'Bares', texto: 'Na mesa, o cliente abre o cardápio e já segue o bar para ver a programação.', placas: ['Cardápio', 'Instagram'] },
  { icone: 'restaurante', nome: 'Restaurantes', texto: 'Cardápio na mesa e um convite para avaliar na saída.', placas: ['Cardápio', 'Avaliação'] },
  { icone: 'roupa', nome: 'Lojas de roupa', texto: 'No provador ou no caixa, quem gostou da peça segue a loja e acompanha as novidades.', placas: ['Instagram', 'WhatsApp'] },
  { icone: 'servicos', nome: 'Salões e serviços', texto: 'Agendamento pelo WhatsApp e avaliação depois do atendimento.', placas: ['WhatsApp', 'Avaliação'] },
];

/** Segmentos que mais usam as placas para comércios. */
export function ParaQuem() {
  return (
    <section id="para-quem" aria-labelledby="para-quem-titulo" className="bg-surface py-20 md:py-30">
      <div className="container-site">
        <SectionHeading
          id="para-quem-titulo"
          centro
          sobretitulo="Para quem"
          titulo={
            <>
              Feita para quem atende
              <br className="hidden md:block" /> no balcão.
            </>
          }
          apoio="Veja as placas que mais combinam com o seu tipo de negócio."
        />
        <div className="grid gap-3.5 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {segmentos.map((s) => (
            <article key={s.nome} className="flex flex-col rounded-card bg-white px-6 py-[26px] md:px-[30px] md:py-8">
              <Icon nome={s.icone} className="mb-[22px] size-10" />
              <h3 className="text-[22px] tracking-[-0.03em]">{s.nome}</h3>
              <p className="mt-2 leading-[1.5] tracking-[-0.015em] text-secondary">{s.texto}</p>
              <p className="mt-auto flex flex-wrap gap-1.5 pt-[22px]">
                {s.placas.map((placa) => (
                  <span key={placa} className="rounded-full bg-surface px-2.5 py-1 text-[13px] font-medium text-nav">
                    {placa}
                  </span>
                ))}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
