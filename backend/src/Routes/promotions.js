import express from "express"
import promotionsController from "../controllers/promotionsController.js"

import upload from "../Utils/cloudinaryConfig.js"

const router = express.Router();

router
.route("/")
.get(promotionsController.getAllPromotions)
.post(upload.single("image"),promotionsController.insertPromotions)

router
.route("/:id")
.put(upload.single("image"),promotionsController.updatePromotion)
.delete(promotionsController.deletePromotion)

export default router;