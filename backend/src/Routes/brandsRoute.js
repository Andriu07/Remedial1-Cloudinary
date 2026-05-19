import express from "express"
import brandsController from "../controllers/brandsController.js"

import upload from "../Utils/cloudinaryConfig.js"

const router = express.Router();

router
.route("/")
.get(brandsController.getAllBrands)
.post(upload.single("image"),brandsController.insertBrand)

router
.route("/:id")
.put(upload.single("image"),promotionsController.updatePromotion)
.delete(brandsController.deleteBrand)

export default router;