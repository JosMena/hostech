import { Router } from "express";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} from "../controllers/products.controller";

import { validateJWT } from "../middlewares/validateJWT";

const router = Router();

// Routes
router.get("/", validateJWT, getProducts);
router.post("/", validateJWT, createProduct);
router.put("/:id", validateJWT, updateProduct);
router.delete("/:id", validateJWT, deleteProduct);
router.get("/:id", validateJWT, getProduct);

export default router;
