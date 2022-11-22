<h1 align="center">
    <img alt="NG.CASH CHALLENGE" src="screenshots/banner.png" width="100%" />
    <br>
</h1>
<h4 align="center">
  Este é um desafio técnico realizado para a NG.CASH com o intuito de ocupar a vaga de desenvolvedor backend.
</h4>



## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:
- **Backend**
  - NestJS
  - TypeORM
  - Banco de dados PostgresSQL
  - Bcrypt
  - Passport / Passport-jwt / Passport-local
  - Class-validator
  - TypeScript
  - Docker
- **FrontEnd**
  - NextJS
  - TailwindCSS
  - Axios
  - Nookies
  - ESLint(Config Airbnb)
  - Phosphor-react
  - React-toastify
  - Date-fns
  - Hooks
  - TypeScript
  - Docker

![NG.CASH CHALLENGE](screenshots/2.png)
![NG.CASH CHALLENGE](screenshots/1.png)

![NG.CASH CHALLENGE](screenshots/3.png)

## 💻 Case

Elaborar uma aplicação fullstack dockerizada, onde os usuários poderiam realizar transações financeiras entre si.

#### Funcionalidades

* Criar um usuário
* Realizar login com usuário já existente utilizando validação de permissão de leitura, por meio de um token
* Ler o seu saldo atual
* Realizar transferência para outro usuário cadastrado no sistema
* Ler todas as transferências que você está vinculado e conseguir filtrar por data e tipo

## 🏗️ Estrutura

O projeto está estruturado em duas pastas são elas: **frontend** e **backend**. Unidos usando o docker-compose.

#### Rotas do backend

**(POST)** /api/v1/auth/register  -->  Rota para se registrar

```json
#Exemplo do corpo da requisição:
{
  "username": "ederson",
  "password": "minhaSenha123"
}
```

```json
#Exemplo de resposta:
{
   "username": "ederson",
   "balance": 100,
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5OWFmNWY1Ny0yMjA4LTRlNDMtOGNhMS1hYTZjY2U4ZWY2YTQiLCJ1c2VybmFtZSI6ImN1bmhhIiwiaWF0IjoxNjY4OTgzNTM0LCJleHAiOjE2NjkwNjk5MzR9.HztpG5UhVQTgkX5JerS_xTdVxP2F51tGf9BnzLrlaLU"
}
```

**(POST)** /api/v1/auth/login  -->  Rota para fazer login

```json
#Exemplo do corpo da requisição:
{
  "username": "ederson",
  "password": "minhaSenha123"
}
```

```json
#Exemplo de resposta:
{
   "username": "ederson",
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5OWFmNWY1Ny0yMjA4LTRlNDMtOGNhMS1hYTZjY2U4ZWY2YTQiLCJ1c2VybmFtZSI6ImN1bmhhIiwiaWF0IjoxNjY4OTgzNTM0LCJleHAiOjE2NjkwNjk5MzR9.HztpG5UhVQTgkX5JerS_xTdVxP2F51tGf9BnzLrlaLU"
}
```

**(POST)** /api/v1/transactions   -->  Rota para fazer uma transferência

```json
#Exemplo do corpo da requisição:
{
  "userReceive": "ngcash",
  "value": 50.54
}
```

```json
#Exemplo de resposta:
{
  "id": "47ec60d3-f954-4c9a-b742-2d9549d79ad7",
  "userReceived": "ngcash",
  "value": 50.54,
  "createAt": "2022-11-21T23:18:11.279Z"
}
```

**(GET)** /api/v1/balance   -->  Rota para puxar suas informações de saldo

```
#Exemplo de header da requisição:

Header: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5OWFmNWY1Ny0yMjA4LTRlNDMtOGNhMS1hYTZjY2U4ZWY2YTQiLCJ1c2VybmFtZSI6ImN1bmhhIiwiaWF0IjoxNjY4OTgzNTM0LCJleHAiOjE2NjkwNjk5MzR9.HztpG5UhVQTgkX5JerS_xTdVxP2F51tGf9BnzLrlaLU" }
```

```json
#Exemplo de resposta:
{
   "username": "ederson",
   "balance": 100
}
```

**(GET)** /api/v1/transactions   -->  Rota para puxar as transações na qual você tenha participado

```
#Exemplo de header da requisição:

Header: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5OWFmNWY1Ny0yMjA4LTRlNDMtOGNhMS1hYTZjY2U4ZWY2YTQiLCJ1c2VybmFtZSI6ImN1bmhhIiwiaWF0IjoxNjY4OTgzNTM0LCJleHAiOjE2NjkwNjk5MzR9.HztpG5UhVQTgkX5JerS_xTdVxP2F51tGf9BnzLrlaLU" }
```

```json
#Exemplo de resposta:
[
   {
      "id": "eb41e58a-f815-4240-980e-47444376122d",
      "cashOut": "ederson",
      "cashIn": "ngcash",
      "value": "50.54",
      "createAt": "2022-11-20T22:33:11.056Z"
   }
]
```

**(GET)** /api/v1/transactions?cashType=cashOut&date=11/19/2022   -->  Rota para puxar as transações na qual você tenha participado, aplicando filtros.

```
#Exemplo de header da requisição:

Header: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5OWFmNWY1Ny0yMjA4LTRlNDMtOGNhMS1hYTZjY2U4ZWY2YTQiLCJ1c2VybmFtZSI6ImN1bmhhIiwiaWF0IjoxNjY4OTgzNTM0LCJleHAiOjE2NjkwNjk5MzR9.HztpG5UhVQTgkX5JerS_xTdVxP2F51tGf9BnzLrlaLU" }
```

```json
#Exemplo de resposta:
[
   {
      "id": "feffa1c7-b805-4bac-8c57-4ec17857a22e",
      "cashOut": "ederson",
      "cashIn": "ngcash",
      "value": "0.54",
      "createAt": "2022-11-19T05:17:41.867Z"
   },
   {
      "id": "19b968a3-953f-4ce9-9b7d-ac1061f7524f",
      "cashOut": "ederson",
      "cashIn": "ngcash",
      "value": "50.54",
      "createAt": "2022-11-19T05:17:43.411Z"
   },
   {
      "id": "46b92de4-8c36-485a-a281-0d4dd8daf207",
      "cashOut": "ederson",
      "cashIn": "ngcash",
      "value": "0.54",
      "createAt": "2022-11-19T05:17:44.287Z"
   },
   {
      "id": "f2315f80-4dbc-4b67-b905-faed5151f0d9",
      "cashOut": "ederson",
      "cashIn": "ngcash",
      "value": "0.54",
      "createAt": "2022-11-19T05:17:45.266Z"
   }
]
```

<img alt="NG.CASH CHALLENGE" src="screenshots/4.png" width="100%" /><img alt="NG.CASH CHALLENGE" src="screenshots/5.png" width="100%" />

## 🚧 Desenvolvimento

#### Como foi feito

Primeiro passo foi organizar os requisitos de um jeito que fizesse mais sentido pra mim, a imagem do excalidraw com o diagrama que criei se encontra logo abaixo. Segundo passo foi pensar em qual tecnologia usar, na Trybe ensinam a usar express e sequelize no **backend**, mas eu estou estudando nestjs e resolvi criar o projeto com ele. Como ele já é nativo do TypeScript fez mais sentido para mim e no **frontend** resolvi testar o framework NextJS por curiosidade e para aprimorar os conhecimentos.

![EXCALIDRAW](screenshots/excalidraw.png)

![FIGMA](screenshots/figma.png)

Link do figma criado por mim: https://www.figma.com/file/MX0pv1Aplfm9pJzvaCtTAE/Layout-para-NG.CASH

#### Comentário

Pretendo no futuro implementar os testes que faltaram, sei que é muito importante para a minimizar possíveis erros na aplicação, bem como aumentar e facilitar a manutenção. Outro ponto é a refatoração do código e implementar o Swagger-UI para documentar as rotas.

## 🛠️ Como instalar

⚠️ **Atenção**: Você precisa ter o docker e o docker-compose instalados em sua máquina para rodar o projeto.

**#Clonar este repositório**

```
git clone https://github.com/edersonlucas/ng-cash-challenge
```

**#Entre na pasta do projeto**

```
cd ng-cash-challenge
```

**#Crie um arquivo com o nome ".env" na pasta raiz do projeto e configure as variáveis de ambiente**

⚠️ Os valores das variáveis devem ser solicitados! ⚠️

    PORT_FRONTEND=
    NEXT_PUBLIC_API_URL=
    
    PORT_BACKEND=
    POSTGRES_USER=
    POSTGRES_PASSWORD=
    
    DATABASE_TYPE=
    DATABASE_HOST=
    DATABASE_PORT=
    DATABASE_NAME=
    DATABASE_USER=
    DATABASE_PASSWORD=
    
    JWT_SECRET=
    JWT_EXPIRES_IN=

**#Agora que você criou o arquivo ".env" rode o seguinte comando (Pode demorar alguns minutos ☕)**[](https://emojipedia.org/pt/café/)

    docker compose up

#### [🚨](https://emojiterra.com/pt/luz-giratoria/) Em caso de dúvida, entre em contato..

[Email](edersonlucas@outlook.com.br) 

[Linkedin](https://www.linkedin.com/in/edersonlucas/)

---

Desenvolvido por: [Ederson Lucas](https://www.linkedin.com/in/edersonlucas/)
