import express from "express";

const app = express();

// Import Routes
import brandRouter from "./routes/users.routes.js";
import productRouter from "./routes/users.routes.js";
import recordRouter from "./routes/users.routes.js";
import usersRouter from "./routes/users.routes.js";

// Middlewares
app.use(express.json());

// Routes
app.use("/api/brands", brandRouter);
app.use("/api/products", productRouter);
app.use("/api/records", recordRouter);
app.use("/api/users", usersRouter);

export default app;
