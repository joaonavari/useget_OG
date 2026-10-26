import { SectionHeading } from '@/components/ui/SectionHeading';

type Pergunta = { pergunta: string; resposta: string };

export function PerguntasFrequentes({ perguntas }: { perguntas: Pergunta[] }) {
  return (
    <section id="duvidas" aria-labelledby="duvidas-titulo" className="py-20 md:py-30">
      <div className="container-site grid gap-2 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <SectionHeading
          id="duvidas-titulo"
          sobretitulo="Dúvidas"
          titulo={
            <>
              Perguntas
              <br />
              frequentes.
            </>
          }
        />
        <div>
          {perguntas.map((item) => (
            <details key={item.pergunta} className="group border-b border-line first:border-t">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] leading-[1.35] font-semibold tracking-[-0.025em] md:py-6 md:text-[19px] [&::-webkit-details-marker]:hidden">
                {item.pergunta}
                <span aria-hidden="true" className="relative size-7 shrink-0 rounded-full bg-surface">
                  <span className="absolute top-1/2 left-1/2 h-[1.6px] w-[11px] -translate-1/2 rounded bg-ink" />
                  <span className="absolute top-1/2 left-1/2 h-[1.6px] w-[11px] -translate-1/2 rotate-90 rounded bg-ink transition-transform duration-200 group-open:rotate-0" />
                </span>
              </summary>
              <p className="pr-2 pb-6 leading-[1.55] tracking-[-0.015em] text-secondary md:pr-12 md:text-[17px]">{item.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
