import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Record = sequelize.define(
  "record",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    action: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    updatedAt: false,
  }
);
