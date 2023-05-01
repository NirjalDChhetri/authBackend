import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import categoryController from "../controller/category.controller";

const router = Router();

router.post(
  "/create",
  catchAsync(categoryController.createcategory.bind(categoryController))
);

export default router;