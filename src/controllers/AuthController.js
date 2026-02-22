const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const AuthController = {
  // POST /v1/user/token
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // 1. Verificar se o usuário existe
      const user = await UserModel.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "E-mail ou senha inválidos" });
      }

      // 2. Comparar a senha usando bcrypt (Hash do banco vs Senha digitada)
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "E-mail ou senha inválidos" });
      }

      // 3. Gerar o Token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.APP_SECRET,
        { expiresIn: "2h" }, // Token expira em 2 horas
      );

      return res.status(200).json({ token });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao realizar login", error: error.message });
    }
  },
};

module.exports = AuthController;
