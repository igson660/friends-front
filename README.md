# AMIGOS — Frontend (Next.js 16)

Interface web da plataforma AMIGOS, construída com **Next.js 16 App Router**, **TypeScript**, **Tailwind CSS 4** e **Yarn**.

---

## Stack

| Tecnologia | Versão | Uso |
|---|---|---|
| Next.js | 16 | Framework React com App Router |
| TypeScript | 5.6 | Tipagem estática |
| Tailwind CSS | 4 | Estilização |
| Zustand | 5 | Estado global (auth) |
| React Query | 5 | Cache e fetching de dados |
| React Hook Form | 7 | Formulários |
| Zod | 4 | Validação de schemas |
| Wretch | 3 | Cliente HTTP com interceptors JWT |
| react-imask | 7 | Máscaras de CPF, CEP, telefone |
| react-hot-toast | 2 | Notificações |
| react-select | 5 | Selects customizados |

---

## Pré-requisitos

- Node.js >= 18
- Yarn
- Backend Django rodando em `http://localhost:8000`

---

## Instalação

```bash
# 1. Clone ou extraia o projeto
cd amigos-frontend

# 2. Instale as dependências
yarn install

# 3. Configure as variáveis de ambiente
cp .env.local.example .env.local
# Edite .env.local e defina NEXT_PUBLIC_API_URL

# 4. Inicie o servidor de desenvolvimento
yarn dev
# → http://localhost:3000
```

---

## Estrutura de Pastas

```
src/
├── app/                    # App Router (Next.js 16)
│   ├── layout.tsx          # Layout raiz com Providers
│   ├── page.tsx            # Redirect → /login
│   ├── login/              # Página de login
│   ├── dashboard/          # Dashboard com métricas
│   ├── network/            # Árvore hierárquica da rede
│   ├── map/                # Distribuição geográfica
│   ├── profile/            # Perfil do usuário
│   ├── register/           # Cadastro via convite (público)
│   └── link-profile/       # Vincular conta a perfil existente
├── components/
│   ├── Sidebar.tsx         # Navegação lateral
│   ├── DashboardLayout.tsx # Layout protegido
│   └── ui/                 # FormField, StatCard, PageHeader
├── hooks/
│   ├── useAuth.ts          # Hook de autenticação
│   ├── useCpf.ts           # Validação de CPF
│   └── useCep.ts           # Busca de CEP
├── lib/
│   ├── api.ts              # Cliente HTTP (wretch) + todos os endpoints
│   ├── providers.tsx       # React Query + Toast providers
│   └── utils.ts            # Utilitários (cn, formatters)
├── middleware.ts            # Proteção de rotas (Next.js middleware)
├── store/
│   └── authStore.ts        # Zustand store de autenticação
└── types/
    └── index.ts            # Tipos TypeScript compartilhados
```

---

## Rotas

| Rota | Acesso | Descrição |
|---|---|---|
| `/login` | Público | Login com usuário/senha |
| `/register?token=xxx` | Público | Cadastro via link de convite |
| `/dashboard` | Autenticado | Métricas e link de convite |
| `/network` | Autenticado | Árvore hierárquica da rede |
| `/map` | Autenticado | Mapa com distribuição geográfica |
| `/profile` | Autenticado | Edição de dados pessoais |
| `/link-profile` | Autenticado | Vincular conta a perfil existente |

---

## Autenticação

- JWT armazenado em `localStorage` via `tokenStorage`
- Refresh automático via interceptor no cliente wretch
- Zustand persiste `isAuthenticated` entre reloads
- Middleware Next.js protege rotas autenticadas no servidor

---

## Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Sim | URL base do backend Django |
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | Não | Chave Google Maps (mapa interativo) |

---

## Build para Produção

```bash
yarn build
yarn start
```

---

## Lint e Type Check

```bash
yarn lint
yarn type-check
```
