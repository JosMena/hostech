import { Router } from "express";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getProductsByUser,
} from "../controllers/users.controller.js";

const router = Router();

// Routes
router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);

router.get("/:id/products", getProductsByUser);

export default router;
