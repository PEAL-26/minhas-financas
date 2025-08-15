# Roadmap do Projeto

Este documento descreve as futuras melhorias e implementações planejadas para o **Minhas Finanças**.

## Melhorias

- [x] **Tipagem e Validação de Dados**
  - **Descrição:** Utilizar o Zod para criar esquemas de validação para todas as entidades do banco de dados e garantir a integridade dos dados em toda a aplicação.

- [ ] **Gerenciamento de Estado Centralizado**
  - **Descrição:** Criar um contexto React para gerenciar o estado do usuário e outras informações globais da aplicação.

- [ ] **Autenticação e Autorização**
  - **Descrição:** Implementar a autenticação de usuários com o Firebase Auth e proteger as rotas da aplicação para garantir que apenas usuários autorizados possam acessar os dados.

- [ ] **Sincronização de Dados Otimizada**
  - **Descrição:** Implementar uma fila de sincronização e uma estratégia de resolução de conflitos para garantir a consistência dos dados entre o dispositivo local e o Firebase.

## Implementações

- [x] **CRUD Completo**
  - **Descrição:** Desenvolver as telas e a lógica de negócios para permitir que o usuário crie, leia, atualize e exclua todas as entidades da aplicação (categorias, transações, despesas, rendas, necessidades e locais).

- [ ] **Dashboard Financeiro**
  - **Descrição:** Criar um painel principal que exiba um resumo visual das finanças do usuário, incluindo gráficos e indicadores-chave.

- [ ] **Filtros e Pesquisa Avançada**
  - **Descrição:** Implementar funcionalidades de filtro e pesquisa em todas as telas de listagem para facilitar a localização de informações específicas.

- [ ] **Notificações**
  - **Descrição:** Configurar notificações locais para lembrar os usuários sobre despesas recorrentes, metas financeiras e outras informações importantes.

- [ ] **Internacionalização (i18n)**
  - **Descrição:** Adicionar suporte para múltiplos idiomas para tornar a aplicação acessível a um público global.
