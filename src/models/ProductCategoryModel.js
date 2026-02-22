const { DataTypes } = require("sequelize");
const connection = require("../config/connection");

const ProductCategoryModel = connection.define(
  "ProductCategory",
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "products", key: "id" },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "categories", key: "id" },
    },
  },
  {
    tableName: "product_category",
    timestamps: false,
  },
);

module.exports = ProductCategoryModel;
