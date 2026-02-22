const { DataTypes } = require("sequelize");
const connection = require("../config/connection");

const UserModel = connection.define(
  "User",
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false, // preenchimento obrigatório
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false, // preenchimento obrigatório
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // preenchimento obrigatório
      unique: true, // não permite emails repetidos
      validate: {
        isEmail: true, // valida se é um formato de email real
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // preenchimento obrigatório
    },
  },
  {
    tableName: "users",
    timestamps: true, // Requisito: cria automaticamente created_at e updated_at
  },
);

module.exports = UserModel;
