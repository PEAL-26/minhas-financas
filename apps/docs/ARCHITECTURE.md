# Arquitetura do Projeto

## Visão Geral

O **Minhas Finanças** é construído com uma arquitetura que prioriza a experiência do usuário, permitindo o uso contínuo do aplicativo mesmo em ambientes com conectividade limitada ou offline. A sincronização de dados em segundo plano garante que as informações estejam sempre atualizadas quando uma conexão com a internet estiver disponível.

## Offline-First

A abordagem offline-first é o pilar da nossa arquitetura. Utilizamos o [Drizzle ORM](https://orm.drizzle.team/) em conjunto com o [Expo-SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) para criar e gerenciar um banco de dados local no dispositivo do usuário. Todas as operações de criação, leitura, atualização e exclusão (CRUD) são realizadas primeiramente no banco de dados local, proporcionando uma experiência de usuário rápida e responsiva.

## Sincronização de Dados

A sincronização de dados com o [Firebase](https://firebase.google.com/) é realizada de forma assíncrona. Quando o aplicativo detecta uma conexão com a internet, ele inicia um processo de sincronização que envia as alterações locais para o Firebase e baixa as atualizações do servidor. Este processo é projetado para ser eficiente e não interferir na experiência do usuário.

## Estrutura do Projeto

O projeto é um monorepo gerenciado com [Turborepo](https://turbo.build/repo) e está dividido em duas aplicações principais:

- **`apps/web`:** A aplicação web desenvolvida com [Next.js](https://nextjs.org/).
- **`apps/app`:** A aplicação móvel desenvolvida com [React Native](https://reactnative.dev/) e [Expo](https://expo.dev/).

Ambas as aplicações compartilham a mesma lógica de negócios e acesso aos dados, garantindo uma experiência consistente em todas as plataformas.
