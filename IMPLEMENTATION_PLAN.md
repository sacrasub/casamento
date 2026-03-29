# Plano de Implementação: Site de Casamento Sacramento & Shirley

Este documento detalha a arquitetura, estratégia de desenvolvimento e segurança para o site de casamento dos noivos Sacramento e Shirley.

## Visão Geral
O projeto será um Web App moderno construído com **Next.js (App Router)**, focado em performance mobile-first, estética premium (minimalista/tons pastéis) e integração fluida com **Supabase** para persistência de dados.

## Estrutura de Pastas (Next.js App Router)

```text
/src
  /app
    /(public)           # Rotas públicas (Hero, RSVP, Presentes)
      /page.tsx         # Landing page principal
      /layout.tsx       # Layout com fontes e cores base
    /admin              # Dashboard de convidados (Rota Protegida)
      /convidados
        /page.tsx       # Tabela de convidados e estatísticas
    /api                # Endpoints (se necessário)
  /components
    /ui                 # Componentes base (Button, Modal, Input)
    /sections           # Seções da Landing Page (Hero, Info, RSVP, GiftList)
    /admin              # Componentes específicos do dashboard
  /lib
    /supabase           # Cliente e helper functions do Supabase
    /utils              # Formatadores de moeda, timers, etc.
  /hooks                # Custom hooks (ex: useCountdown)
/supabase
  /schema.sql           # Modelagem do banco e RLS
```

## Estratégia de Componentização

1.  **Design System**: Utilizaremos Tailwind CSS com uma paleta customizada em `tailwind.config.ts` (off-white, pastéis, tons terrosos suaves).
2.  **Seções Isoladas**: Cada seção (`Hero`, `RSVPForm`, `GiftShowcase`) será um componente React Server Component por padrão, utilizando Client Components apenas onde houver interatividade (contagem regressiva, formulários, modais).
3.  **Vitrine de Presentes**: Componente dinâmico que renderiza cards de produtos. Para itens em cotas, o componente calculará o progresso e o valor unitário.
4.  **Modais**: Implementação de modais acessíveis para o fluxo de "Presentear", exibindo o QR Code PIX gerado.

## Proteção da Rota Admin

Para garantir a privacidade da lista de convidados sem a complexidade de um Auth completo (OAuth/Email), utilizaremos a seguinte estratégia:

-   **Variável de Ambiente**: `ADMIN_PASSWORD` configurada no Vercel/Supabase.
-   **Middleware ou Server Action**:
    -   Ao acessar `/admin`, o usuário será desafiado por um formulário de senha simples.
    -   A verificação será feita via Server Action, que define um cookie de sessão assinado (JWT ou similar) se a senha estiver correta.
    -   A rota `/admin/*` será protegida por um logic gate que verifica esse cookie.

## Passo a Passo do Desenvolvimento

1.  **Fundação**: Inicialização do Next.js, configuração do Tailwind e fontes premium (Google Fonts: *Montserrat* para títulos e *Lato* para corpo).
2.  **Database**: Execução do `schema.sql` no Supabase e inserção de dados iniciais na tabela `gifts`.
3.  **Frontend - Core**: Implementação do Layout e Seção Hero com contagem regressiva.
4.  **Frontend - Funcionalidades**:
    -   Formulário RSVP com validação (Zod + React Hook Form).
    -   Vitrine de Presentes e Modal de PIX.
5.  **Admin Dashboard**: Implementação da tabela de convidados e lógica de proteção por senha.
6.  **Polimento**: Animações de entrada (Framer Motion), otimização de imagens e SEO.

## Plano de Verificação

### Testes Manuais
-   **RSVP**: Testar submissão com diferentes números de acompanhantes e verificar se os dados aparecem no console do Supabase.
-   **Presentes**: Validar se o cálculo de cotas está correto e se o modal exibe o valor selecionado.
-   **Admin**: Tentar acessar `/admin` sem senha para garantir o bloqueio.
