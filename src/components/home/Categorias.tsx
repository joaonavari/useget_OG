import { CardCategoria } from '@/components/catalogo/CardCategoria';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { CategoriaComTotal } from '@/lib/catalogo';

export function Categorias({ categorias }: { categorias: CategoriaComTotal[] }) {
  return (
    <section id="categorias" aria-labelledby="categorias-titulo" className="bg-surface py-20 md:py-30">
      <div className="container-site">
        <SectionHeading
          id="categorias-titulo"
          centro
          sobretitulo="As linhas USEGET"
          titulo="Um produto para cada negócio."
          apoio="Comece pelas placas para comércios. Novas linhas para empresas, fábricas e pet shops estão chegando."
        />
        <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {categorias.map((categoria) => (
            <CardCategoria key={categoria.slug} categoria={categoria} />
          ))}
        </div>
      </div>
    </section>
  );
}
