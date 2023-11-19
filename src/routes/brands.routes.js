import { Router } from "express";

import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
} from "../controllers/brands.controller";

const router = Router();

// Routes
router.get("/", getBrands);
router.post("/", createBrand);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);
router.get("/:id", getBrand);

export default router;
