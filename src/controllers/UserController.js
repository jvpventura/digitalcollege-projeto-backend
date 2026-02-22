const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

const UserController = {
  // POST /v1/user
  async create(req, res) {
    try {
      const { firstname, surname, email, password, confirmPassword } = req.body;

      // Validação de confirmação de senha
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "As senhas não coincidem" });
      }

      // Gerando o Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criando o usuário no banco
      const newUser = await UserModel.create({
        firstname,
        surname,
        email,
        password: hashedPassword,
      });

      // Resposta de sucesso (Status 201 Created)
      return res.status(201).json({
        id: newUser.id,
        firstname: newUser.firstname,
        surname: newUser.surname,
        email: newUser.email,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao criar usuário",
        details: error.message,
      });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params; // Pega o ID que vem na URL (ex: /v1/user/1)

      const user = await UserModel.findByPk(id, {
        attributes: ["id", "firstname", "surname", "email"], // Requisito: não retornar a senha!
      });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" }); // Status 404 conforme escopo
      }

      return res.status(200).json(user); // Status 200 para sucesso na leitura
    } catch (error) {
      return res.status(400).json({ message: "Erro ao buscar usuário", error });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params; // Pega o ID da URL
      const { firstname, surname, email } = req.body; // Pega os novos dados do corpo da requisição

      // Busca o usuário primeiro para saber se ele existe
      const user = await UserModel.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" }); // Status 404 conforme escopo
      }

      // Atualiza os campos
      await user.update({ firstname, surname, email });

      // Status 204: Sucesso, mas sem corpo de resposta
      return res.status(204).send();
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao atualizar usuário", error }); // Status 400 para dados incorretos
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params; // Pega o ID da URL

      const user = await UserModel.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" }); //
      }

      await user.destroy(); // O Sequelize remove o registro do banco

      return res.status(204).send(); // Sucesso sem corpo de resposta
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao deletar usuário", error }); //
    }
  },
};

module.exports = UserController;
