import type { ComponentType } from 'react';
import type { SecaoCategoria } from '@/types/catalogo';
import { ComoAtivar } from './ComoAtivar';
import { ParaQuem } from './ParaQuem';

/**
 * Liga o nome usado em `secoes` (src/data/catalogo.ts) ao componente da seção.
 * Para criar uma seção nova: faça o componente nesta pasta, adicione o nome em
 * SecaoCategoria (src/types/catalogo.ts) e registre aqui.
 */
export const secoesDeCategoria: Record<SecaoCategoria, ComponentType> = {
  'como-ativar': ComoAtivar,
  'para-quem': ParaQuem,
};
