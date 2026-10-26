/*
 * CATÁLOGO USEGET
 * ===============
 * Todas as categorias e produtos do site ficam aqui. As páginas se montam sozinhas
 * a partir desta lista.
 *
 * Nova categoria: copie um bloco de `categorias`, troque os textos e escolha um
 * `slug` (vira o endereço /categorias/{slug}). Sem produtos, ela mostra "em breve".
 *
 * Novo produto: coloque as fotos em public/images/produtos/, copie um bloco de
 * `produtos` e aponte `categoria` para o slug da categoria certa. Produtos com
 * mais de uma cor listam cada cor em `variantes`.
 *
 * Futuro: quando os dados forem para o Supabase, este arquivo deixa de existir e
 * só src/lib/catalogo.ts muda. As páginas continuam iguais.
 */
import type { Categoria, Especificacao, Imagem, Produto } from '@/types/catalogo';

/** Foto padrão das placas (1143 × 846). */
function fotoPlaca(arquivo: string, alt: string): Imagem {
  return { src: `/images/produtos/${arquivo}`, alt, largura: 1143, altura: 846 };
}

/** Especificações comuns a todas as placas para comércios. */
const especificacoesPlacaComercio: Especificacao[] = [
  { rotulo: 'Tamanho', valor: '10 × 10 cm' },
  { rotulo: 'Material', valor: 'Acrílico cristal' },
  { rotulo: 'Impressão', valor: 'UV direto no material' },
  { rotulo: 'Tecnologia', valor: 'NFC integrado + QR Code dinâmico' },
];

export const categorias: Categoria[] = [
  {
    slug: 'placas-para-comercios',
    nome: 'Placas para comércios',
    nomeCurto: 'Comércios',
    resumo: 'Avaliações no Google, Instagram, WhatsApp e cardápio com um toque.',
    descricao:
      'Placas de acrílico com NFC e QR Code que levam o seu cliente direto para avaliar no Google, seguir no Instagram, chamar no WhatsApp ou abrir o cardápio. Sem app e sem complicação.',
    icone: 'loja',
    imagemCapa: fotoPlaca(
      'placa-google-azul-1143.webp',
      'Placa USEGET Avalie no Google, azul, em acrílico com NFC e QR Code.',
    ),
    secoes: ['como-ativar', 'para-quem'],
    ordem: 1,
    seo: {
      titulo: 'Placas NFC para comércios',
      descricao:
        'Placas de acrílico com NFC e QR Code para avaliações no Google, Instagram, WhatsApp e cardápio. Acrílico cristal 10 × 10 cm com impressão UV.',
    },
  },
  {
    slug: 'placas-informativas',
    nome: 'Placas informativas para empresas e fábricas',
    nomeCurto: 'Empresas e fábricas',
    resumo: 'Sinalização com NFC e QR Code para manuais, procedimentos e informações da operação.',
    descricao:
      'Placas com NFC e QR Code para empresas e fábricas: um toque e a equipe abre manuais, procedimentos, fichas de segurança e contatos, direto no celular.',
    icone: 'fabrica',
    textoEmBreve:
      'Estamos preparando a linha de placas informativas. Conte o que a sua empresa precisa e a gente avisa quando estiver disponível.',
    ordem: 2,
  },
  {
    slug: 'pet-shop',
    nome: 'Pet shop',
    resumo: 'Produtos com NFC e QR Code pensados para pet shops e tutores.',
    descricao:
      'Uma linha de produtos com NFC e QR Code feita para pet shops e para quem cuida de pets. Prática no balcão e no dia a dia.',
    icone: 'pet',
    textoEmBreve:
      'A linha pet está chegando. Fale com a gente para saber das novidades primeiro.',
    ordem: 3,
  },
];

export const produtos: Produto[] = [
  {
    id: 'google',
    slug: 'avaliacao-google',
    categoria: 'placas-para-comercios',
    nome: 'Avaliação no Google',
    resumo: 'Mais avaliações e mais destaque no Google e no Maps.',
    descricao:
      'Convide quem gostou do atendimento a deixar uma avaliação. O cliente aproxima o celular ou aponta a câmera e cai direto na tela de avaliar o seu negócio. Mais avaliações ajudam você a aparecer melhor no Google e no Maps.',
    destaques: [
      'Abre direto na tela de avaliação do seu negócio',
      'Ideal para o caixa, o balcão ou a mesa',
      'Disponível em azul e em preto',
    ],
    especificacoes: especificacoesPlacaComercio,
    variantes: [
      {
        id: 'azul',
        nome: 'Azul',
        cor: '#1f6fe5',
        imagens: [
          fotoPlaca('placa-google-azul-1143.webp', 'Placa USEGET Avalie no Google, azul, em acrílico com NFC e QR Code.'),
        ],
      },
      {
        id: 'preta',
        nome: 'Preta',
        cor: '#1d1d1f',
        imagens: [
          fotoPlaca('placa-google-preta-1143.webp', 'Placa USEGET Avalie no Google, preta, em acrílico com NFC e QR Code.'),
        ],
      },
    ],
    ordem: 1,
  },
  {
    id: 'instagram',
    slug: 'instagram',
    categoria: 'placas-para-comercios',
    nome: 'Instagram',
    resumo: 'Ganhe seguidores direto do balcão.',
    descricao:
      'Um toque e o cliente já está no seu perfil. Perfeita para transformar quem passou pela loja em seguidor e manter o contato com as novidades, promoções e lançamentos.',
    destaques: [
      'Abre o seu perfil direto no app do Instagram',
      'Ideal para o caixa, o provador ou a mesa',
      'Funciona por aproximação ou pela câmera',
    ],
    especificacoes: especificacoesPlacaComercio,
    variantes: [
      {
        id: 'padrao',
        nome: 'Padrão',
        imagens: [fotoPlaca('placa-instagram-1143.webp', 'Placa USEGET Instagram em acrílico, com NFC e QR Code.')],
      },
    ],
    ordem: 2,
  },
  {
    id: 'whatsapp',
    slug: 'whatsapp',
    categoria: 'placas-para-comercios',
    nome: 'WhatsApp',
    resumo: 'Uma conversa com o seu negócio na hora.',
    descricao:
      'O cliente aproxima o celular e já abre uma conversa com o seu WhatsApp, sem precisar salvar o número. Ótima para pedidos, reservas, agendamentos e atendimento.',
    destaques: [
      'Abre a conversa sem precisar salvar o número',
      'Ideal para pedidos, reservas e agendamentos',
      'Funciona por aproximação ou pela câmera',
    ],
    especificacoes: especificacoesPlacaComercio,
    variantes: [
      {
        id: 'padrao',
        nome: 'Padrão',
        imagens: [fotoPlaca('placa-whatsapp-1143.webp', 'Placa USEGET WhatsApp em acrílico, com NFC e QR Code.')],
      },
    ],
    ordem: 3,
  },
  {
    id: 'cardapio',
    slug: 'cardapio',
    categoria: 'placas-para-comercios',
    nome: 'Cardápio',
    resumo: 'O seu cardápio digital na mesa.',
    descricao:
      'O cliente aproxima o celular e já vê o cardápio completo, sem esperar o garçom e sem cardápio de papel para trocar. Quando o cardápio muda, a placa continua a mesma.',
    destaques: [
      'Abre o seu cardápio digital na hora',
      'Atualize o cardápio sem trocar a placa',
      'Ideal para mesas de bares e restaurantes',
    ],
    especificacoes: especificacoesPlacaComercio,
    variantes: [
      {
        id: 'padrao',
        nome: 'Padrão',
        imagens: [fotoPlaca('placa-cardapio-1143.webp', 'Placa USEGET Cardápio em acrílico, com NFC e QR Code.')],
      },
    ],
    ordem: 4,
  },
];
