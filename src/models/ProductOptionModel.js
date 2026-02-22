const { DataTypes } = require("sequelize");
const connection = require("../config/connection");

const ProductOptionModel = connection.define(
  "ProductOption",
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "products", key: "id" },
    },
    title: { type: DataTypes.STRING, allowNull: false },
    shape: { type: DataTypes.ENUM("square", "circle"), defaultValue: "square" },
    radius: { type: DataTypes.INTEGER, defaultValue: 0 },
    type: { type: DataTypes.ENUM("text", "color"), defaultValue: "text" },
    values: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "product_options",
    timestamps: false,
  },
);

module.exports = ProductOptionModel;
