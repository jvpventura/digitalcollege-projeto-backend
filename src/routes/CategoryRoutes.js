const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const authMiddleware = require("../middleware/AuthMiddleware");

// 1º - Rota de busca (ESTÁTICA) - Deve vir primeiro!
router.get("/v1/category/search", CategoryController.search);

// 2º - Rota de criação
router.post("/v1/category", CategoryController.create);

// 3º - Rota por ID (DINÂMICA) - Deve vir por último!
router.get("/v1/category/:id", CategoryController.getById);
router.put("/v1/category/:id", CategoryController.update);
router.delete("/v1/category/:id", CategoryController.delete);
router.delete("/v1/category/:id", authMiddleware, CategoryController.delete);
module.exports = router;
