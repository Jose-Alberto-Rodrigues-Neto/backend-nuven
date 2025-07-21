# Rode o projeto utilizando Docker

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

Pronto, seu projeto está rodando, agora basta acessar o link do Swagger UI para testar os endpoints.

# Rode o projeto localmente

*`escrever como rodar o projeto localmente amanhã`*