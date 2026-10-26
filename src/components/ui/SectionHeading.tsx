import type { ReactNode } from 'react';

type Props = {
  /** Texto pequeno acima do título. */
  sobretitulo?: string;
  titulo: ReactNode;
  /** Texto de apoio abaixo do título. */
  apoio?: ReactNode;
  centro?: boolean;
  /** id do título, para aria-labelledby da seção. */
  id?: string;
  /** Nível do título. Padrão: h2. */
  nivel?: 'h1' | 'h2';
  className?: string;
};

export function SectionHeading({ sobretitulo, titulo, apoio, centro = false, id, nivel = 'h2', className = '' }: Props) {
  const Titulo = nivel;
  return (
    <div className={`mb-9 md:mb-14 ${centro ? 'text-center' : ''} ${className}`}>
      {sobretitulo && <p className="mb-3.5 text-[15px] font-semibold tracking-[-0.01em] text-secondary">{sobretitulo}</p>}
      <Titulo id={id} className={nivel === 'h1' ? 'titulo-1' : 'titulo-2'}>
        {titulo}
      </Titulo>
      {apoio && (
        <p
          className={`mt-5 max-w-[640px] text-lg leading-[1.45] tracking-[-0.02em] text-pretty text-secondary md:text-[21px] ${
            centro ? 'mx-auto' : ''
          }`}
        >
          {apoio}
        </p>
      )}
    </div>
  );
}
