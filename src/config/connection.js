const { Sequelize } = require("sequelize");
require("dotenv").config(); // Isso carrega os dados do seu arquivo .env

// Criando a instância de conexão
const connection = new Sequelize(
  process.env.DB_NAME, // Nome do banco
  process.env.DB_USER, // Usuário do banco
  process.env.DB_PASSWORD, // Senha do banco
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Para não encher o terminal de logs do SQL
    define: {
      timestamps: true, // Requisito do projeto: created_at e updated_at
      underscored: true, // Transforma CamelCase em snake_case (ex: userId -> user_id)
    },
  },
);

// Testando a conexão
connection
  .authenticate()
  .then(() => console.log("✅ Conectado ao MySQL com sucesso!"))
  .catch((err) => console.error("❌ Erro ao conectar ao banco:", err));

module.exports = connection;
