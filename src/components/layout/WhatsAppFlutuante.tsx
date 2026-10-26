'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BotaoWhatsApp } from '@/components/ui/BotaoWhatsApp';
import { Icon } from '@/components/ui/Icon';
import { mensagens } from '@/lib/whatsapp';

/** Páginas de produto já têm uma barra fixa própria com o botão de pedido. */
const ehPaginaDeProduto = (caminho: string) => /^\/categorias\/[^/]+\/[^/]+\/?$/.test(caminho);

/**
 * Botão verde no canto da tela. Aparece depois que o visitante rola um pouco e
 * some quando a seção de contato (id="contato") está visível.
 */
export function WhatsAppFlutuante() {
  const caminho = usePathname();
  const [rolou, setRolou] = useState(false);
  const [contatoVisivel, setContatoVisivel] = useState(false);

  useEffect(() => {
    const atualizar = () => setRolou(window.scrollY > window.innerHeight * 0.5);
    atualizar();
    window.addEventListener('scroll', atualizar, { passive: true });
    return () => window.removeEventListener('scroll', atualizar);
  }, []);

  useEffect(() => {
    const contato = document.getElementById('contato');
    if (!contato || !('IntersectionObserver' in window)) return;
    const observador = new IntersectionObserver(([entrada]) => setContatoVisivel(entrada.isIntersecting));
    observador.observe(contato);
    return () => {
      observador.disconnect();
      // Ao trocar de página, recomeça como "contato fora da tela".
      setContatoVisivel(false);
    };
  }, [caminho]);

  if (ehPaginaDeProduto(caminho)) return null;

  const visivel = rolou && !contatoVisivel;

  return (
    <BotaoWhatsApp
      mensagem={mensagens.geral}
      rastreio={{ origem: 'botao-flutuante' }}
      icone={false}
      semEstilo
      ariaLabel="Falar no WhatsApp"
      className={`fixed right-4 bottom-4 z-50 grid size-[54px] place-items-center rounded-full bg-whatsapp text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,0.35)] transition-[opacity,transform] duration-300 ease-mola md:right-5 md:bottom-5 md:size-[58px] ${
        visivel ? 'opacity-100' : 'pointer-events-none translate-y-5 scale-90 opacity-0'
      }`}
    >
      <Icon nome="whatsapp" className="size-7" />
    </BotaoWhatsApp>
  );
}
