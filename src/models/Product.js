import { DataTypes } from "sequelize";

import { sequelize } from "../database/database.js";

import { Brand } from "./Brand.js";
import { Record } from "./Record.js";

export const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.SMALLINT,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
  }
);

// Associations

Product.belongsTo(Brand, {
  foreignKey: "brandId",
  targetId: "id",
});

Product.hasMany(Record, {
  foreignKey: "productId",
  sourceKey: "id",
});

Record.belongsTo(Product, {
  foreignKey: "productId",
  targetId: "id",
});
