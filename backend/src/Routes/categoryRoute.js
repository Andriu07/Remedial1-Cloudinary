import express from "express"
import categorysController from "../controllers/categorysController.js"

import upload from "../Utils/cloudinaryConfig.js"

const router = express.Router();

router
.route("/")
.get(categorysController.getAllCategorys)
.post(upload.single("image"),categorysController.insertCategory)

router
.route("/:id")
.put(upload.single("image"),categorysController.updateCategory)
.delete(categorysController.deleteCategory)

export default router;