import { Categorias } from '@/components/home/Categorias';
import { Destaques } from '@/components/home/Destaques';
import { Hero } from '@/components/home/Hero';
import { Material } from '@/components/home/Material';
import { ComoFunciona } from '@/components/secoes/ComoFunciona';
import { Contato } from '@/components/secoes/Contato';
import { PedidoQuantidade } from '@/components/secoes/PedidoQuantidade';
import { PerguntasFrequentes } from '@/components/secoes/PerguntasFrequentes';
import { perguntasFrequentes } from '@/data/faq';
import { getCategorias } from '@/lib/catalogo';

export default async function PaginaInicial() {
  const categorias = await getCategorias();

  return (
    <>
      <Hero />
      <Destaques />
      <Categorias categorias={categorias} />
      <ComoFunciona />
      <Material />
      <PedidoQuantidade />
      <PerguntasFrequentes perguntas={perguntasFrequentes} />
      <Contato />
    </>
  );
}
