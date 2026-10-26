const itens = [
  { valor: '10×10', unidade: 'cm', texto: 'Compacta para balcão, mesa ou caixa.' },
  { valor: 'NFC', unidade: '+ QR', texto: 'Abre por aproximação ou pela câmera.' },
  { valor: 'Zero', unidade: 'apps', texto: 'Nada para o cliente instalar.' },
  { valor: '1', unidade: 'min', texto: 'Para ativar você mesmo, sem técnico.' },
];

export function Destaques() {
  return (
    <section aria-label="Destaques" className="pt-12 pb-[72px] md:pt-[72px] md:pb-28">
      <div className="container-site grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-4">
        {itens.map((item) => (
          <div key={item.valor} className="border-t border-line pt-6">
            <p className="flex items-baseline gap-1.5 text-[clamp(40px,4.4vw,56px)] leading-none font-bold tracking-[-0.05em]">
              {item.valor}
              <small className="text-[0.38em] font-semibold tracking-[-0.02em] text-secondary">{item.unidade}</small>
            </p>
            <p className="mt-3 text-[15px] leading-[1.45] tracking-[-0.015em] text-secondary md:text-base">{item.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
