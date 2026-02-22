const express = require("express");
const connection = require("./config/connection");

// 1. Importar os models atribuindo a variáveis (CORREÇÃO AQUI)
const UserModel = require("./models/UserModel");
const CategoryModel = require("./models/CategoryModel");
const ProductModel = require("./models/ProductModel");
const ProductImageModel = require("./models/ProductImageModel");
const ProductOptionModel = require("./models/ProductOptionModel");
const ProductCategoryModel = require("./models/ProductCategoryModel");

// --- INÍCIO DAS ASSOCIAÇÕES ---

// 1. Produto e Imagens (Um para Muitos)
ProductModel.hasMany(ProductImageModel, {
  foreignKey: "product_id",
  as: "images",
});
ProductImageModel.belongsTo(ProductModel, { foreignKey: "product_id" });

// 2. Produto e Opções (Um para Muitos)
ProductModel.hasMany(ProductOptionModel, {
  foreignKey: "product_id",
  as: "options",
});
ProductOptionModel.belongsTo(ProductModel, { foreignKey: "product_id" });

// 3. Produto e Categorias (Muitos para Muitos via Tabela Intermediária)
ProductModel.belongsToMany(CategoryModel, {
  through: ProductCategoryModel,
  foreignKey: "product_id",
  otherKey: "category_id",
  as: "categories",
});
CategoryModel.belongsToMany(ProductModel, {
  through: ProductCategoryModel,
  foreignKey: "category_id",
  otherKey: "product_id",
  as: "products",
});

// --- FIM DAS ASSOCIAÇÕES ---

const app = express();
const userRoutes = require("./routes/UserRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const productRoutes = require("./routes/ProductRoutes");

app.use(express.json());
app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);

// Sincronizar o banco de dados
connection
  .sync({ force: false })
  .then(() => {
    console.log("✅ Tabelas sincronizadas com sucesso!");
  })
  .catch((error) => {
    console.error("❌ Erro ao sincronizar tabelas:", error);
  });

module.exports = app;
