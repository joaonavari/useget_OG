import Link from 'next/link';

export type PassoTrilha = { rotulo: string; href?: string };

/** Trilha de navegação ("Início › Categoria › Produto"). O último item é a página atual. */
export function Trilha({ passos }: { passos: PassoTrilha[] }) {
  return (
    <nav aria-label="Você está em" className="text-sm text-secondary">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {passos.map((passo, i) => (
          <li key={passo.rotulo} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">›</span>}
            {passo.href ? (
              <Link href={passo.href} className="hover:text-ink">
                {passo.rotulo}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {passo.rotulo}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
