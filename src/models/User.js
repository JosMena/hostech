import { DataTypes } from "sequelize";

import { sequelize } from "../database/database.js";

import { Product } from "./Product.js";
import { Brand } from "./Brand.js";
import { Record } from "./Record.js";

export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
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
User.hasMany(Product, {
  foreignKey: "userId",
  sourceKey: "id",
});

Product.belongsTo(User, {
  foreignKey: "userId",
  targetId: "id",
});

User.hasMany(Brand, {
  foreignKey: "userId",
  sourceKey: "id",
});

Brand.belongsTo(User, {
  foreignKey: "userId",
  targetId: "id",
});

User.hasMany(Record, {
  foreignKey: "userId",
  sourceKey: "id",
});

Record.belongsTo(User, {
  foreignKey: "userId",
  targetId: "id",
});
