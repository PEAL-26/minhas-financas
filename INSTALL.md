# Guia de Instalação

Siga as instruções abaixo para configurar o ambiente de desenvolvimento do **Minhas Finanças**.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [Git](https://git-scm.com/)

## Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/PEAL-26/minhas-financas.git
    cd minhas-financas
    ```

2.  **Instale as dependências do projeto:**

    ```bash
    npm install
    ```

3.  **Configure o Firebase:**

    - Crie um projeto no [Firebase Console](https://console.firebase.google.com/).
    - Crie um arquivo `.env` na raiz do diretório `apps/web` e adicione as credenciais do seu projeto Firebase, seguindo o exemplo do arquivo `.env.example`.

4.  **Execute as aplicações:**

    - **Web:**

      ```bash
      npm run dev:webapp
      ```

    - **Mobile (React Native/Expo):**

      ```bash
      npm run dev:app
      ```
