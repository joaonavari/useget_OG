'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { BotaoWhatsApp } from '@/components/ui/BotaoWhatsApp';
import { mensagens } from '@/lib/whatsapp';
import { Wordmark } from './Wordmark';

export type ItemMenu = { href: string; rotulo: string };

export function Header({ itens }: { itens: ItemMenu[] }) {
  const caminho = usePathname();
  const [aberto, setAberto] = useState(false);
  const atual = (href: string) => (href !== '/' && caminho.startsWith(href) ? 'page' : undefined);
  const [rolou, setRolou] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const botaoRef = useRef<HTMLButtonElement>(null);

  // Linha fina embaixo do cabeçalho depois que a página rola.
  useEffect(() => {
    const atualizar = () => setRolou(window.scrollY > 8);
    atualizar();
    window.addEventListener('scroll', atualizar, { passive: true });
    return () => window.removeEventListener('scroll', atualizar);
  }, []);

  // Menu do celular: fecha com Esc, com toque fora ou ao virar tela grande.
  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAberto(false);
        botaoRef.current?.focus();
      }
    };
    const aoTocar = (e: PointerEvent) => {
      if (e.target instanceof Node && !headerRef.current?.contains(e.target)) setAberto(false);
    };
    const telaGrande = window.matchMedia('(min-width: 768px)');
    const aoRedimensionar = () => telaGrande.matches && setAberto(false);
    document.addEventListener('keydown', aoTeclar);
    document.addEventListener('pointerdown', aoTocar);
    telaGrande.addEventListener('change', aoRedimensionar);
    return () => {
      document.removeEventListener('keydown', aoTeclar);
      document.removeEventListener('pointerdown', aoTocar);
      telaGrande.removeEventListener('change', aoRedimensionar);
    };
  }, [aberto]);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 h-[var(--header-height)] border-b bg-white/85 backdrop-blur-xl backdrop-saturate-[1.8] transition-colors duration-200 ${
        rolou || aberto ? 'border-black/8' : 'border-transparent'
      }`}
    >
      <div className="container-site flex h-full items-center gap-3 md:gap-8">
        <Link href="/" aria-label="USEGET, página inicial" onClick={() => setAberto(false)}>
          <Wordmark />
        </Link>

        <nav aria-label="Navegação principal" className="ml-auto hidden gap-7 md:flex">
          {itens.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={atual(item.href)}
              className="text-sm text-nav transition-colors hover:text-ink aria-[current=page]:font-medium aria-[current=page]:text-ink"
            >
              {item.rotulo}
            </Link>
          ))}
        </nav>

        <BotaoWhatsApp
          mensagem={mensagens.geral}
          rastreio={{ origem: 'cabecalho' }}
          tamanho="pequeno"
          className="ml-auto max-md:w-10 max-md:px-0 md:ml-0"
          ariaLabel="Pedir orçamento pelo WhatsApp"
        >
          <span className="hidden md:inline">Pedir orçamento</span>
        </BotaoWhatsApp>

        <button
          ref={botaoRef}
          type="button"
          className="relative grid size-10 cursor-pointer place-items-center rounded-full md:hidden"
          aria-expanded={aberto}
          aria-controls="menu-celular"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setAberto((v) => !v)}
        >
          <span
            aria-hidden="true"
            className={`absolute h-[1.5px] w-[18px] bg-current transition-transform duration-250 ${
              aberto ? 'rotate-45' : '-translate-y-[3.5px]'
            }`}
          />
          <span
            aria-hidden="true"
            className={`absolute h-[1.5px] w-[18px] bg-current transition-transform duration-250 ${
              aberto ? '-rotate-45' : 'translate-y-[3.5px]'
            }`}
          />
        </button>
      </div>

      <nav
        id="menu-celular"
        aria-label="Menu"
        hidden={!aberto}
        className="absolute inset-x-0 top-full border-b border-line bg-white/98 px-5 pt-2 pb-5 md:hidden"
      >
        {itens.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={atual(item.href)}
            onClick={() => setAberto(false)}
            className="block border-b border-[#ededf0] py-3.5 text-[19px] font-semibold tracking-[-0.02em] last:border-b-0"
          >
            {item.rotulo}
          </Link>
        ))}
      </nav>
    </header>
  );
}
