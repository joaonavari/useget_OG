# USEGET

Site da USEGET (Maringá/PR): produtos com NFC e QR Code, com pedidos pelo WhatsApp.
Feito em Next.js 16 (App Router), TypeScript e Tailwind CSS 4. Pensado primeiro para
o celular, porque a maior parte das visitas vem de anúncios no Instagram e no Facebook.

A pasta `referencia/` é o site antigo, usado só como base visual. Ela fica fora do git
e do build.

## Rodar no computador

Precisa do Node.js 20 ou mais novo.

```sh
npm install
npm run dev        # abre em http://localhost:3000
```

Antes de publicar:

```sh
npm run lint       # verifica o código
npm run build      # gera a versão final
npm start          # roda a versão final
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local` (no computador) ou configure no painel da
hospedagem:

| Variável | Para que serve |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Domínio do site (ex.: `https://www.useget.com.br`). Usado no sitemap, nos links de compartilhamento e nos dados para o Google. **Defina antes de publicar.** |
| `NEXT_PUBLIC_META_PIXEL_ID` | ID do Pixel da Meta. Vazio = Pixel desligado. |

## Onde editar

| O que | Onde |
|---|---|
| Categorias e produtos | `src/data/catalogo.ts` |
| Perguntas frequentes | `src/data/faq.ts` |
| WhatsApp, Instagram, nome, cidade | `src/config/site.ts` |
| Mensagens prontas do WhatsApp | `src/lib/whatsapp.ts` |
| Fotos | `public/images/produtos/` |
| Cores e fonte | `src/app/globals.css` (bloco `@theme`) |
| Textos da página inicial | `src/components/home/` e `src/components/secoes/` |

### Adicionar um produto

1. Coloque a foto em `public/images/produtos/` (de preferência `.webp`, 1143 × 846 px,
   como as atuais).
2. Em `src/data/catalogo.ts`, copie um bloco da lista `produtos` e troque `id`, `slug`,
   `nome`, `resumo`, `descricao`, `destaques` e a foto.
3. Em `categoria`, coloque o `slug` da categoria (por exemplo `'pet-shop'`).
4. Se o produto tiver cores, liste cada uma em `variantes` com `nome`, `cor` e foto.

Pronto: a página do produto, o cartão na categoria, o sitemap e a mensagem do WhatsApp
se montam sozinhos. Quando a primeira peça de uma categoria "em breve" entrar, o aviso
some e a grade de produtos aparece.

### Adicionar uma categoria

Copie um bloco da lista `categorias` em `src/data/catalogo.ts`. O `slug` vira o
endereço (`/categorias/{slug}`) e o item entra no menu sozinho. O ícone pode ser
`'loja'`, `'fabrica'` ou `'pet'`. Para um ícone novo, desenhe-o em
`src/components/ui/Icon.tsx`.

Não mude o `slug` de algo já publicado: o endereço antigo deixa de funcionar e quebra
os links dos anúncios.

## Endereços

| Página | Endereço |
|---|---|
| Início | `/` |
| Categoria | `/categorias/placas-para-comercios` |
| Produto | `/categorias/placas-para-comercios/avaliacao-google` |
| Sitemap | `/sitemap.xml` |

## Estrutura

```
src/
├── app/                  páginas (rotas do Next.js)
│   ├── page.tsx          página inicial
│   ├── categorias/[categoria]/page.tsx
│   ├── categorias/[categoria]/[produto]/page.tsx
│   ├── layout.tsx        cabeçalho, rodapé, WhatsApp flutuante e Pixel
│   ├── not-found.tsx     página 404
│   └── sitemap.ts, robots.ts
├── components/
│   ├── layout/           cabeçalho, rodapé, botão flutuante
│   ├── home/             seções exclusivas da página inicial
│   ├── secoes/           seções reaproveitáveis (contato, FAQ, como ativar...)
│   ├── catalogo/         cartões de categoria e produto, aviso "em breve"
│   ├── produto/          parte interativa da página de produto
│   ├── analytics/        Pixel da Meta
│   └── ui/               ícones, botões, títulos
├── config/site.ts        configurações gerais
├── data/                 catálogo e perguntas frequentes
├── lib/
│   ├── catalogo.ts       leitura do catálogo (o único lugar que lê data/catalogo.ts)
│   ├── whatsapp.ts       links e mensagens do WhatsApp
│   └── analytics.ts      eventos do Pixel
└── types/catalogo.ts     tipos de categoria, produto e variante
```

## WhatsApp

O número fica só em `src/config/site.ts` (`whatsapp`, só dígitos, com 55 + DDD).
Nos DDDs fora de SP/RJ/ES (como o 44), o link `wa.me` precisa ir sem o 9 da frente.
O site faz essa troca sozinho em `src/lib/whatsapp.ts`.

Mensagens prontas:
- Produto: "Olá! Vim pelo site da USEGET e tenho interesse no produto Avaliação no
  Google (Azul), da categoria Placas para comércios. Pode me passar valores e condições?"
- Categoria em breve: "...tenho interesse na linha Pet shop. Pode me avisar quando
  estiver disponível?"

## Pixel da Meta

Defina `NEXT_PUBLIC_META_PIXEL_ID` e publique de novo. O Pixel passa a registrar:
- `PageView` em cada página;
- `ViewContent` ao abrir um produto;
- `Contact` em cada clique para o WhatsApp (com produto, cor, categoria e o botão de
  origem).

Use o evento `Contact` como conversão nas campanhas.

## Próximos passos já preparados

### Banco de dados (Supabase)

As páginas nunca leem `src/data/catalogo.ts` direto: elas chamam as funções de
`src/lib/catalogo.ts` (`getCategorias`, `getProduto` etc.). Para usar o Supabase:

1. Crie as tabelas `categorias`, `produtos` e `variantes` seguindo os tipos de
   `src/types/catalogo.ts` (o `id` do produto vira a chave).
2. Troque o corpo das funções de `src/lib/catalogo.ts` por consultas ao Supabase,
   devolvendo os mesmos tipos. As funções já usam `'use cache'`, então as consultas
   ficam em cache. Para atualizar o site quando o catálogo mudar, use
   `cacheTag` / `revalidateTag`.
3. Apague `src/data/catalogo.ts`.

### Carrinho e pagamento

Os tipos já têm `preco` e `precoPromocional` (em centavos, ex.: `4990` = R$ 49,90),
`estoque` e `sku`, no produto e em cada variante. Um caminho natural:
- `src/lib/carrinho/` com o estado do carrinho (itens = `produto.id` + `variante.id` +
  quantidade);
- trocar o `BotaoWhatsApp` da página de produto por "Adicionar ao carrinho" quando o
  produto tiver preço;
- `src/app/carrinho/` e `src/app/checkout/` para as novas páginas;
- pagamento por um provedor (Mercado Pago, Stripe, Pagar.me) em uma rota de servidor
  em `src/app/api/`.

O evento `Contact` do Pixel pode virar `AddToCart` / `Purchase` em `src/lib/analytics.ts`.

## Observações

- Um endereço de categoria ou produto que não existe mostra a página 404 e vai marcado
  como `noindex` (o Google não indexa), mas o código HTTP fica 200. Esse é o
  comportamento padrão do Next 16 para páginas pré-geradas. Para devolver 404 de verdade,
  dá para checar o endereço num `src/proxy.ts`.
- Ainda faltam fotos das placas em uso (no balcão, na mesa). Elas deixariam as páginas
  de produto mais fortes: é só acrescentar em `imagens` de cada variante, e a página
  mostra miniaturas sozinha.
