import { Icon, type NomeIcone } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';

const passos: { icone: NomeIcone; titulo: string; texto: string }[] = [
  { icone: 'nfc', titulo: 'Aproxima ou aponta a câmera', texto: 'O NFC funciona por aproximação. Quem preferir, usa o QR Code.' },
  { icone: 'seta', titulo: 'A página abre na hora', texto: 'Direto no navegador, sem baixar nenhum aplicativo.' },
  { icone: 'check', titulo: 'Pronto, chegou lá', texto: 'Avalia, segue, chama no WhatsApp ou vê o cardápio.' },
];

/** Como o cliente final usa um produto USEGET. */
export function ComoFunciona() {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-titulo" className="py-20 md:py-30">
      <div className="container-site">
        <SectionHeading
          id="como-funciona-titulo"
          centro
          sobretitulo="Como funciona"
          titulo={
            <>
              Simples para você.
              <br />
              <span className="text-tertiary">Mais ainda para o cliente.</span>
            </>
          }
        />
        <ol className="grid gap-3 md:grid-cols-3 md:gap-5">
          {passos.map((passo, i) => (
            <li key={passo.titulo} className="flex gap-4 rounded-card bg-surface p-6 md:flex-col md:p-8">
              <span className="fundo-gradiente grid size-11 shrink-0 place-items-center rounded-full text-white">
                <Icon nome={passo.icone} className="size-5" />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-secondary">Passo {i + 1}</p>
                <h3 className="mt-0.5 text-[19px] leading-[1.25] tracking-[-0.025em] md:text-[22px]">{passo.titulo}</h3>
                <p className="mt-1.5 text-[15px] leading-[1.5] text-secondary md:text-base">{passo.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
