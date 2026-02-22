const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.get("/v1/product/search", ProductController.search);
router.get("/v1/product/:id", ProductController.getById);
router.post("/v1/product", ProductController.create);
router.put("/v1/product/:id", ProductController.update);
router.delete("/v1/product/:id", ProductController.delete);

module.exports = router;
