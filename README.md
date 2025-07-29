# Rode o projeto utilizando Docker

Inicialmente você precisará gerar uma chave para a api do gemini e colocar ela no seu .env, sem ela não será possível rodar o código.

### `Não esqueça de colocar sua api_key e seu modelo utilizado do Gemini`

```shell
    # Seu .env deve estar exatamente assim para rodar da maneira correta utilizando o docker, que no caso é o .env padrão do projeto, porém se não estiver da forma que está abaixo, apenas copie e cole no seu .env que irá funcionar

    # Variáveis do banco
    POSTGRES_USER=user
    POSTGRES_PASSWORD=pgpassword
    POSTGRES_DB=postgredb
    POSTGRES_HOST=database
    POSTGRES_PORT=5432

    # Prisma
    DATABASE_URL=postgresql://user:pgpassword@database:5432/postgredb?schema=public

    # App
    PORT=8080
    JWT_SECRET=jsonwebtokensecret
    NODE_ENV=development

    # Gemini
    GEMINI_API_KEY=coloque sua apikey do gemini aqui # Não esqueça de colocar sua api_key
    GEMINI_MODEL=coloque o modelo que você está utilizando para fazer requisições no gemini aqui # Não esqueça de colocar seu modelo
```

Após o download do repositório do Github verifique se seu docker está rodando corretamente, pois iremos utilizar apenas o docker para rodar todo o projeto.

Após verificar que seu docker está funcionando de forma devida utilize o comando `docker compose up`. 

Vale ressaltar que não recomendo utilizar o comando docker compose up -d, pois utilizar o terminal como forma de vizualizar os logs dos nossos containers docker irá facilitar no momento de saber se o código já está rodando, além de facilitar o acesso aos links principais (`Swagger Ui` e `localhost` corretos)

```shell
    # rode no seu terminal
    docker compose ps # para verificar se seu docker está rodando normalmente

    # logo após rode no seu terminal
    docker compose up 
```

Após rodar o comando espere que o setup do projeto no docker esteja completo, você saberá quando aparecer o texto abaixo no seu terminal.

```shell
    backend-server  | > ts@1.0.0 dev
    backend-server  | > tsx src/app.ts
    backend-server  |
    backend-server  | [dotenv@17.2.0] injecting env (0) from .env (tip: 🔐 encrypt with dotenvx: https://dotenvx.com)
    backend-server  | [dotenv@17.2.0] injecting env (0) from .env (tip: 🔐 prevent building .env in docker: https://dotenvx.com/prebuild)
    backend-server  | Servidor rodando em http://localhost:8080
    backend-server  | Swagger UI: http://localhost:8080/api-docs
```

Pronto, seu projeto está rodando, agora basta acessar o link do [Swagger UI](http://localhost:8080/api-docs) para testar os endpoints.

# Rode o projeto localmente

Caso não queira rodar o projeto pelo docker você deve inicialmente `mudar o seu arquivo .env`.

```shell
    # Seu .env deve estar exatamente assim para rodar da maneira correta localmente, então caso queira rodar localmente copie e cole no seu .env

    # Variáveis do banco
    POSTGRES_USER=user
    POSTGRES_PASSWORD=pgpassword
    POSTGRES_DB=postgredb
    POSTGRES_HOST=database
    POSTGRES_PORT=5432

    # Prisma
    DATABASE_URL=postgresql://user:pgpassword@localhost:5432/postgredb?schema=public

    # App
    PORT=8080
    JWT_SECRET=jsonwebtokensecret
    NODE_ENV=development

    # Gemini
    GEMINI_API_KEY=coloque sua apikey do gemini aqui # Não esqueça de colocar sua api_key
    GEMINI_MODEL=coloque o modelo que você está utilizando para fazer requisições no gemini aqui # Não esqueça de colocar seu modelo
```

Após criar seu .env, eu recomendo que você inicie criando seu banco de dados usando o docker com o comando abaixo

```shell
    docker compose up database -d # Importante utilizar o [database] para não rodar o container docker do backend
```

Logo após partimos para o processo de instalar as dependências e rodar o projeto
```shell
    # Comando inicial
    npm install

    mkdir -p prisma/migrations
    npx prisma migrate dev
    npx prisma generate

    # Logo após rode o projeto utilizando o comando
    npm run dev
```

Pronto, agora espere seu projeto rodar e acesse o link do [Swagger UI](http://localhost:8080/api-docs) para testar os endpoints.
