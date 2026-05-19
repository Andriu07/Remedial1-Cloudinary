import express from "express"
import productsController from "../controllers/productsController.js"

import upload from "../Utils/cloudinaryConfig.js"

const router = express.Router();

router
.route("/")
.get(productsController.getAllProducts)
.post(upload.single("image"),productsController.insertProduct)

router
.route("/:id")
.put(upload.single("image"),productsController.updateProduct)
.delete(productsController.deleteProduct)

export default router;