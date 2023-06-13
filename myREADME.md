# Meu Projeto Incrível

## CRUD de Usuários

O projeto possui um CRUD de Usuários que permite realizar operações básicas de criação, leitura, atualização e exclusão de usuários.

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Jest](https://jestjs.io/)
- [JSON Web Token](https://jwt.io/)

## Instalação

Siga as instruções abaixo para instalar as dependências do projeto:

1. Certifique-se de ter o Node.js instalado em seu sistema. Você pode fazer o download e instalação do Node.js em [nodejs.org](httptts://nodejs.org).

2. Clone o repositório do projeto para o seu diretório local:

   ```shell
   git clone git@github.com:arthur-debiasi/vagas.git
   ```

3. Navegue até o diretório raiz do projeto:

   ```shell
   cd vagas
   ```

4. Execute o comando abaixo para instalar as dependências:

   ```shell
   npm install
   ```

## Rodando a API

1. Você pode rodar a API utilizando o seguinte comando:

   ```shell
   npm start
   ```

2. Ou, se preferir, pode rodar a API no modo desenvolvedor (nodemon):

      ```shell
   npm run dev
   ```

## Como utilizar o CRUD de Usuários

Certifique-se de substituir os parâmetros corretamente e utilizar os métodos HTTP corretos para cada operação.

1. Para ler os dados de um usuário específico, faça uma requisição HTTP GET para a rota `localhost:3000/user/?name={Insira_o_nome_aqui}
` substituindo o nome usuário desejado;

2. Para ler os dados de todos os usuários, faça uma requisição HTTP GET para a rota `localhost:3000/users`

3. Para criar um novo usuário, faça uma requisição HTTP POST para a rota `localhost:3000/users` com os dados do usuário no corpo da requisição, no seguinte formato:

```json
{
  "name": "Arthur Debiasi",
  "job": "Desenvolvedor"
}
```

4. Para excluir os dados de um usuário, faça uma requisição HTTP DELETE para a rota `localhost:3000/user/?name={Insira_o_nome_aqui}` substituindo o nome do usuário que deseja excluir. Observe que é necessário incluir um cabeçalho Authorization com o token gerado no processo de login (6).

5. Para atualizar os dados de um usuário existente, faça uma requisição HTTP PUT para a rota `localhost:3000/users/?id={id}` substituindo `{id}` pelo ID do usuário desejado e enviando os dados atualizados no corpo da requisição, no seguinte formato:

```json
{
  "name": "Arthur Debiasi",
  "job": "Engenheiro"
}
```

Observe que é necessário incluir um cabeçalho Authorization com o token gerado no processo de login (6).

6. Para realizar o login, faça uma requisição HTTP POST para a rota `localhost:3000/login` com as credenciais do usuário no corpo da requisição, no seguinte formato:

```json
{
  "email": "seu_email@example.com",
  "password": "sua_senha"
}
```

O servidor verificará se as credenciais são válidas e retornará um token de autenticação. Esse token deverá ser utilizado para autenticar o administrador nas requisições que excluem(4) e deletam(5) usuários.

## Rodando os testes

1. Para executar a rotina de testes automatizados, voce pode utilizar o seguinte comando:

```shell
  npm test
```

Observe que também é gerado um relatório de cobertura de testes, tanto no terminal, quanto no diretório `coverage`
