const { DataTypes } = require("sequelize");
const connection = require("../config/connection");

const ProductImageModel = connection.define(
  "ProductImage",
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "products", key: "id" },
    },
    enabled: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    path: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "product_images",
    timestamps: false,
  },
);

module.exports = ProductImageModel;
