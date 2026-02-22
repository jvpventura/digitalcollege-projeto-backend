const { DataTypes } = require("sequelize");
const connection = require("../config/connection");

const ProductModel = connection.define(
  "Product",
  {
    enabled: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    description: { type: DataTypes.STRING },
    price: { type: DataTypes.FLOAT, allowNull: false },
    price_with_discount: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    tableName: "products",
    timestamps: true,
  },
);

module.exports = ProductModel;
