# Quick Assets

Quick Assets é um gerenciador de carteiras de investimento com múltiplos tipos de ativos, análise inteligente, integração com dados em tempo real e alertas personalizados. Desenvolvido com Next.js 15, Prisma, PostgreSQL, Supabase, Clerk e inteligência artificial.

## Funcionalidades

- Cadastro de múltiplas carteiras por usuário
- Suporte a diversos ativos: Ações BR/USA, FIIs, ETFs, Renda Fixa
- Dados de mercado atualizados em tempo real (via BRAPI API)
- IA integrada para análises personalizadas de ativos
- Alertas por e-mail quando ativos atingirem determinado preço
- Suporte a usuários autenticados (via Clerk) e anônimos (localStorage/Redis)
- UI moderna e responsiva com TailwindCSS

## Tecnologias

- **Next.js 15 (App Router)**
- **Prisma ORM**
- **PostgreSQL (via Supabase)**
- **Clerk (autenticação)**
- **TailwindCSS (UI)**
- **Docker + GitHub Actions (deploy)**
- **Redis (dados temporários para usuários anônimos)**
- **BRAPI (API de dados financeiros)**
- **OpenAI / IA personalizada** para análise de ativos
- **n8n** para envio automático de alertas

## Instalação

```bash
git clone https://github.com/gustavowkayser/quick-assets.git
cd quick-assets
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
