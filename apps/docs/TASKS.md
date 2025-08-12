# Lista de Tarefas do Projeto

Este documento detalha as tarefas necessárias para implementar todas as funcionalidades do **Minhas Finanças**.

## 🏗️ Arquitetura e Configuração Base

-   [x] **Configurar Módulo de Tipos Compartilhados (`packages/types`):**
    -   [x] Criar esquemas Zod para todas as tabelas do banco de dados (`category`, `transaction`, `expense`, `income`, `wishlist`, `location`).
    -   [x] Definir e exportar os tipos TypeScript inferidos dos esquemas Zod.
-   [x] **Configurar Módulo de UI Compartilhada (`packages/ui`):**
    -   [x] Criar componentes de UI genéricos (Botão, Input, Card, etc.) para serem usados tanto na web quanto no mobile.
-   [ ] **Configurar Contexto de Autenticação:**
    -   [ ] Criar um React Context para gerenciar o estado do usuário (logado/deslogado, dados do usuário).
-   [x] **Configurar Firebase:**
    -   [x] Criar o projeto no Firebase Console.
    -   [x] Configurar o Firebase Auth e o Firestore.
    -   [x] Adicionar as credenciais do Firebase nos arquivos de ambiente (`.env`) para web e mobile.

## 🔐 Autenticação

-   [ ] **Desenvolver Telas de Autenticação (Mobile & Web):**
    -   [ ] Tela de Login.
    -   [ ] Tela de Cadastro.
    -   [ ] Tela de "Esqueci minha senha".
-   [ ] **Implementar Lógica de Autenticação:**
    -   [x] Integrar as telas com o Firebase Auth (Email/Senha, Google).
    -   [x] Implementar a lógica de logout.
-   [ ] **Implementar Rotas Protegidas:**
    -   [ ] Configurar o `expo-router` e o `next.js` para redirecionar usuários não autenticados para a tela de login.

##  CRUD - Categorias

-   [x] **Desenvolver Tela de Listagem de Categorias:**
    -   [x] Exibir todas as categorias do usuário.
    -   [x] Permitir a exclusão de uma categoria.
-   [x] **Desenvolver Formulário de Criação/Edição de Categoria:**
    -   [x] Criar um formulário para adicionar e editar categorias.
    -   [x] Implementar a validação de dados com Zod.
-   [ ] **Implementar Lógica de Sincronização:**
    -   [ ] Sincronizar as operações de CRUD de categorias com o Firestore.

##  CRUD - Locais

-   [x] **Desenvolver Tela de Listagem de Locais:**
    -   [x] Exibir todos os locais cadastrados pelo usuário.
    -   [x] Permitir a exclusão de um local.
-   [x] **Desenvolver Formulário de Criação/Edição de Local:**
    -   [x] Criar um formulário para adicionar e editar locais.
    -   [x] Implementar a validação de dados com Zod.
-   [ ] **Implementar Lógica de Sincronização:**
    -   [ ] Sincronizar as operações de CRUD de locais com o Firestore.

## 💸 CRUD - Rendas (Incomes)

-   [x] **Desenvolver Tela de Listagem de Rendas:**
    -   [ ] Exibir todas as rendas (únicas e recorrentes).
    -   [x] Permitir a exclusão de uma renda.
-   [ ] **Desenvolver Formulário de Criação/Edição de Renda:**
    -   [x] Criar um formulário completo com todos os campos da tabela `incomes`.
    -   [ ] Implementar a lógica para rendas recorrentes.
    -   [ ] Implementar a validação de dados com Zod.
-   [ ] **Implementar Lógica de Sincronização:**
    -   [ ] Sincronizar as operações de CRUD de rendas com o Firestore.

## 💳 CRUD - Despesas (Expenses)

-   [x] **Desenvolver Tela de Listagem de Despesas:**
    -   [x] Exibir todas as despesas (únicas e recorrentes).
    -   [x] Permitir a exclusão de uma despesa.
-   [ ] **Desenvolver Formulário de Criação/Edição de Despesa:**
    -   [x] Criar um formulário completo com todos os campos da tabela `expenses`.
    -   [ ] Implementar a lógica para despesas recorrentes.
    -   [ ] Implementar a validação de dados com Zod.
-   [ ] **Implementar Lógica de Sincronização:**
    -   [ ] Sincronizar as operações de CRUD de despesas com o Firestore.

## ✨ CRUD - Necessidades (Wishlist)

-   [ ] **Desenvolver Tela de Listagem de Necessidades:**
    -   [x] Exibir a lista de desejos do usuário.
    -   [x] Permitir a exclusão de uma necessidade.
-   [ ] **Desenvolver Formulário de Criação/Edição de Necessidade:**
    -   [x] Criar um formulário para adicionar e editar necessidades.
    -   [x] Implementar a validação de dados com Zod.
-   [ ] **Implementar Lógica de Sincronização:**
    -   [ ] Sincronizar as operações de CRUD de necessidades com o Firestore.

## 🔄 Transações

-   [ ] **Desenvolver Tela de Listagem de Transações:**
    -   [ ] Exibir um extrato de todas as transações (rendas e despesas efetivadas).
-   [ ] **Implementar Lógica de Criação de Transações:**
    -   [ ] Criar uma transação automaticamente quando uma renda ou despesa é marcada como "feita" (`done`).
-   [ ] **Implementar Lógica de Sincronização:**
    -   [ ] Sincronizar as transações com o Firestore.

## 📊 Dashboard

-   [ ] **Desenvolver a UI do Dashboard:**
    -   [ ] Criar componentes para exibir o saldo atual.
    -   [ ] Criar um gráfico de despesas por categoria (ex: Gráfico de Pizza).
    -   [ ] Criar um gráfico de evolução de rendas vs. despesas ao longo do tempo (ex: Gráfico de Linhas).
-   [ ] **Implementar Lógica de Agregação de Dados:**
    -   [ ] Criar as consultas SQL (Drizzle) para buscar e agregar os dados para os gráficos.

## ☁️ Sincronização de Dados (Offline-First)

-   [ ] **Implementar Fila de Sincronização:**
    -   [ ] Criar uma tabela local para registrar todas as operações CRUD que precisam ser enviadas ao Firebase.
    -   [ ] Desenvolver um serviço que processa essa fila quando o dispositivo está online.
-   [ ] **Implementar Estratégia de Resolução de Conflitos:**
    -   [ ] Definir e implementar uma estratégia (ex: "última escrita vence") para lidar com conflitos de dados.
-   [ ] **Implementar Sincronização em Background:**
    -   [ ] Configurar tarefas em segundo plano para executar a sincronização periodicamente.

## ⚙️ Refinamentos e Funcionalidades Adicionais

-   [ ] **Implementar Filtros e Pesquisa:**
    -   [ ] Adicionar campos de busca e filtros nas telas de listagem (Transações, Rendas, Despesas).
-   [ ] **Implementar Notificações Locais:**
    -   [ ] Enviar lembretes para despesas recorrentes que estão próximas do vencimento.
-   [ ] **Internacionalização (i18n):**
    -   [ ] Configurar uma biblioteca de i18n (ex: `i18next`).
    -   [ ] Extrair todas as strings de texto para arquivos de tradução.
