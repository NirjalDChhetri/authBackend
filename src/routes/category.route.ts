import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import categoryController from "../controller/category.controller";

const router = Router();

router.post(
  "/",
  catchAsync(categoryController.createcategory.bind(categoryController))
);
router.get(
  "/",
  catchAsync(categoryController.getAllCategories.bind(categoryController))
);
router
  .route("/:id")
  .get(catchAsync(categoryController.getCategoryById.bind(categoryController)))
  .delete(catchAsync(categoryController.deleteCategory.bind(categoryController)))
  .put(catchAsync(categoryController.updateCategory.bind(categoryController)))


  export default router;
