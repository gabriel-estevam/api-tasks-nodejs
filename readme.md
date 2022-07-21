# Roadmap API Tasks
## Objetivo
Desenvolver uma API para cadastro de tarefas online - To Do List. Na API o usuário deve realizar seu cadastro pessoal, sendo: nome, e-mail e uma senha para acessar o aplicativo, e no app o usuário cadastra suas tarefas a serem cumpridas.

## Tecnologias utilizadas: 
- Linguagem de Programação - JavaScript NodeJS;
- Banco de dados - Postgres.

### Estrutura do Projeto
- Pasta API: Onde fica armazenado os arquivos de persistência dos dados de cada entities do projeto;
- Pasta config: Nesse pasta deixamos configurado os arquivos de rotas, middlwares e banco de dados.
- Pasta migrations: Para esse projeto estamos usando o conceito de migrations (migrações) para criar e/ou deletar as tabelas do banco de dados. Portanto nesse pasta ficará os arquivos de migrations das tabelas (entities) do banco de dados.

### Dependências utilizadas no projeto:
- Express - para criar o servidor nodejs;
- Knex - para criação das migrations e integração com o banco de dados;
-  Cors- para que qualquer URL consiga acessar a API;
- body-parser - para realizar a interpretação dos dados vindo da URL, nesse projeto os dados virão e retornarão no formato JSON;
- bcrypt-nodejs - para criar uma criptografia na senha do usuário e selvar no banco de dados: Essa lib gerar um hash diferente para a senha do usuário;
- jwt-simple - para utilizar token web no formato JSON;
- passport - para autenticação com outras plataformas como por exemplo: Apple, Microsoft, Instagram entre outros;
- passport-jwt - para autenticação do endpoints que usam JSON web token;
- Moment - para formato de data;
- consign - para gerenciamento das rotas da API, com esse lib conseguimos deixar os modulos do nosso backend mais organizado, por exemplo nesse projeto colocamos as rotas em um arquivo e os middlwares em outro arquivo, e ao utiliza o consign conseguimos unir esses dois modulos