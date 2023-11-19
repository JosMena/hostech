import { Router } from "express";

import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
} from "../controllers/brands.controller";

import { validateJWT } from "../middlewares/validateJWT";

const router = Router();

// Routes
router.get("/", validateJWT, getBrands);
router.post("/", validateJWT, createBrand);
router.put("/:id", validateJWT, updateBrand);
router.delete("/:id", validateJWT, deleteBrand);
router.get("/:id", validateJWT, getBrand);

export default router;
