const { DataTypes } = require("sequelize");
const connection = require("../config/connection");

const CategoryModel = connection.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    use_in_menu: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
  },
  {
    tableName: "categories",
    timestamps: true,
  },
);

module.exports = CategoryModel;
