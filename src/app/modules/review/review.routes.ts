import express from "express";
import { multerUpload } from "../../config/multer.config";
import auth from "../../middlewares/auth";
import { reviewControllers } from "./review.controller";

const router = express.Router();

const uploadFields = multerUpload.fields([{ name: "photos", maxCount: 5 }]);

router.get("/product/:productId", reviewControllers.getApprovedReviewsByProduct);
router.get("/", reviewControllers.getAllReviews);
router.get("/:id", reviewControllers.getSingleReview);
router.post("/", auth("customer"), uploadFields, reviewControllers.createReview);
router.patch("/:id", auth("admin", "super-admin"), uploadFields, reviewControllers.updateReview);
router.delete("/:id", auth("admin", "super-admin"), reviewControllers.deleteReview);

export const reviewRoutes = router;
