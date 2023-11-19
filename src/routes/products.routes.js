import { Router } from "express";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} from "../controllers/products.controller";

const router = Router();

// Routes
router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getProduct);

export default router;
