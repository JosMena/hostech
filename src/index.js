import app from "./app.js";
import { sequelize } from "./database/database.js";

const port = process.env.PORT || 3001;

const main = async () => {
  try {
    app.listen(port, () => console.log(`Server running in port: ${port}`));
    await sequelize.sync({ force: false });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();
