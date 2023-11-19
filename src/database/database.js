import Sequelize from "sequelize";

import "dotenv/config";

export const sequelize = new Sequelize(
  process.env.DB_NAME || "projectsdb",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS || "defaultPass",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
