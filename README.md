Digital Store - Back-end 🚀

Este projeto é a API da Digital Store, desenvolvida como projetodo módulo de Back-end da Digital College. A API gerencia um sistema de e-commerce com funcionalidades de usuários, categorias e produtos, incluindo autenticação e relacionamentos complexos de banco de dados.

## 🛠️ Tecnologias Utilizadas

- **Node.js & Express**: Framework base para a construção da API.
- **MySQL**: Banco de dados relacional para armazenamento dos dados.
- **Sequelize**: ORM utilizado para gerenciar as tabelas e relacionamentos (Um-para-Muitos e Muitos-para-Muitos).
- **JWT (JSON Web Token)**: Implementação de autenticação segura para geração de tokens.
- **Bcrypt**: Criptografia de senhas para segurança dos dados dos usuários.

## 🚀 Instalação e Execução

 **Clone o repositório** para sua máquina local.
 **Instale as dependências**:
   ```bash
   npm install
   Configure as Variáveis de Ambiente:
   ```

Crie um arquivo .env na raiz do projeto.

Utilize os campos do arquivo .env.example como guia para preencher suas credenciais do banco de dados e chave secreta.

Banco de Dados:

Certifique-se de que o MySQL está em execução.

Crie um schema chamado digital_store_db.

Inicie o servidor:

Bash
npm run dev

## 📑 Principais Funcionalidades e Endpoints
Autenticação:

POST /v1/user/token: Gera o token JWT após validação de e-mail e senha.

Produtos:

GET /v1/product/search: Lista produtos com suporte a filtros de nome, intervalo de preços e paginação automática (padrão 12 itens).

GET /v1/product/:id: Retorna os detalhes de um produto específico, incluindo suas imagens vinculadas e opções.

Categorias:

GET /v1/category/search: Lista categorias com filtros para exibição em menu e paginação customizável.

📂 Estrutura de Pastas
src/controllers: Lógica de negócio da aplicação.

src/models: Definição das tabelas e associações do banco de dados.

src/routes: Definição das rotas da API.

src/config: Configuração da conexão com o banco de dados.
