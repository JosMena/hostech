import { Router } from "express";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getProductsByUser,
} from "../controllers/users.controller.js";

import { validateJWT } from "../middlewares/validateJWT.js";
import { validateUserId } from "../middlewares/validateIdentity.js";

const router = Router();

// Routes
router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", validateJWT, validateUserId, updateUser);
router.delete("/:id", validateJWT, validateUserId, deleteUser);
router.get("/:id", validateJWT, getUser);

router.get("/:id/products", validateJWT, getProductsByUser);

export default router;
