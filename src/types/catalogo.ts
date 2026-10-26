/**
 * Tipos do catálogo USEGET.
 *
 * Os campos marcados como "futuro" ainda não aparecem no site. Eles já existem
 * para que a troca do arquivo de dados por um banco (Supabase) e a chegada do
 * carrinho e do pagamento não exijam mudar a forma dos dados.
 */

export type Imagem = {
  /** Caminho a partir de /public, por exemplo "/images/produtos/placa.webp". */
  src: string;
  /** Texto alternativo, lido por leitores de tela e pelo Google. */
  alt: string;
  largura: number;
  altura: number;
};

export type Seo = {
  /** Título da aba e do compartilhamento. Sem ele, usa o nome. */
  titulo?: string;
  /** Descrição para o Google e o compartilhamento. Sem ela, usa o resumo. */
  descricao?: string;
};

export type Especificacao = {
  rotulo: string;
  valor: string;
};

/**
 * Seções extras que podem aparecer na página da categoria, depois dos produtos.
 * Cada uma é um componente em src/components/secoes/.
 */
export type SecaoCategoria = 'como-ativar' | 'para-quem';

/** Ícones disponíveis para as categorias (desenhados em components/ui/Icon.tsx). */
export type IconeCategoria = 'loja' | 'fabrica' | 'pet';

export type Categoria = {
  /** Parte do endereço: /categorias/{slug}. Não mude depois de publicar. */
  slug: string;
  nome: string;
  /** Versão curta do nome, usada no menu. Sem ela, usa o nome. */
  nomeCurto?: string;
  /** Uma frase, mostrada nos cartões da página inicial. */
  resumo: string;
  /** Texto de abertura da página da categoria. */
  descricao: string;
  icone: IconeCategoria;
  /** Foto do cartão na página inicial. Sem ela, o cartão mostra o ícone. */
  imagemCapa?: Imagem;
  /** Seções extras da página, na ordem em que aparecem. */
  secoes?: SecaoCategoria[];
  /** Texto do aviso "em breve" quando a categoria ainda não tem produtos. */
  textoEmBreve?: string;
  /** Posição nas listas (menor aparece primeiro). */
  ordem: number;
  /** false esconde a categoria sem apagar. Padrão: true. */
  ativo?: boolean;
  seo?: Seo;
};

export type Variante = {
  /** Identificador fixo, usado na mensagem do WhatsApp e no futuro carrinho. */
  id: string;
  /** Nome mostrado ao cliente, por exemplo "Azul". */
  nome: string;
  /** Cor da bolinha de seleção, quando o produto tem mais de uma cor. */
  cor?: string;
  /** Fotos desta variante. A primeira é a principal. */
  imagens: Imagem[];
  /** Futuro: código interno da variante. */
  sku?: string;
  /** Futuro: preço em centavos, se for diferente do preço do produto. */
  preco?: number;
  /** Futuro: unidades disponíveis desta variante. */
  estoque?: number;
};

export type Produto = {
  /** Identificador fixo. Vai virar a chave do produto no banco de dados. */
  id: string;
  /** Parte do endereço: /categorias/{categoria}/{slug}. Não mude depois de publicar. */
  slug: string;
  /** slug da categoria a que o produto pertence. */
  categoria: string;
  nome: string;
  /** Uma frase, mostrada nos cartões. */
  resumo: string;
  /** Texto completo da página do produto. */
  descricao: string;
  /** Lista curta de benefícios, mostrada com ícones de check. */
  destaques?: string[];
  especificacoes: Especificacao[];
  /** Ao menos uma. Produtos sem opção de cor têm uma única variante "Padrão". */
  variantes: Variante[];
  /** Posição dentro da categoria (menor aparece primeiro). */
  ordem: number;
  /** false esconde o produto sem apagar. Padrão: true. */
  ativo?: boolean;
  seo?: Seo;

  // ---- Futuro: carrinho e pagamento (ainda não usados no site) ----
  /** Preço em centavos (ex.: 4990 = R$ 49,90). Centavos evitam erros de arredondamento. */
  preco?: number;
  /** Preço promocional em centavos. */
  precoPromocional?: number;
  /** Unidades disponíveis. */
  estoque?: number;
  /** Código interno do produto. */
  sku?: string;
};
