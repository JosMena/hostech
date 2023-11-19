import { DataTypes } from "sequelize";

import { sequelize } from "../database/database.js";

import { Record } from "./Record.js";

export const Brand = sequelize.define(
  "brand",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
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
Brand.hasMany(Record, {
  foreignKey: "brandId",
  sourceKey: "id",
});

Record.belongsTo(Brand, {
  foreignKey: "brandId",
  targetId: "id",
});
