import express from "express";

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts); // Endpoint to get all the products from the database
router.post("/", createProduct); // Endpoint to create products and send + save it the database
router.put("/:id", updateProduct); // Endpoint to update a product in the database
router.delete("/:id", deleteProduct); // Endpoint to delete a product in the database

export default router;
