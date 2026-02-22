const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const AuthController = require("../controllers/AuthController");

// Definindo a rota de cadastro conforme o escopo
router.post("/v1/user", UserController.create);

// ... importações
router.post("/v1/user", UserController.create);
router.post("/v1/user/token", AuthController.login); // Rota de login para gerar o token JWT
router.get("/v1/user/:id", UserController.getById); // Nova rota de busca
router.put("/v1/user/:id", UserController.update); // Requisito 04 - Atualizar usuário
router.delete("/v1/user/:id", UserController.delete); // Requisito 05 - Deletar usuário

module.exports = router;
