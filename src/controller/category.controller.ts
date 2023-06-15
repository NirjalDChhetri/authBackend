import { Request, Response, NextFunction } from "express";
import categoryService from "../services/category.service";

class CategoryController {
  constructor() {}

  async createcategory(req: Request, res: Response) {
    const data = req.body;
    const category = await categoryService.create(data);
    res.status(200).json({
      status: "success",
      data: {
        category,
      },
      message: "Category created",
    });
  }
  async getAllCategories(req: Request, res: Response) {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({
      status: "success",
      data: {
        categories,
      },
      message: "Categories fetched successfully",
    });
  }

  async getCategoryById(req: Request, res: Response) {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);
    res.status(200).json({
      status: "success",
      data: {
        category,
      },
      message: "Category fetched by Id",
    });
  }

  async deleteCategory(req: Request, res: Response) {
    const id = req.params.id as string;
    const category = await categoryService.deleteCategory(id);
    res.status(200).json({
      status: "success",
      data: {
        category,
      },
      message: "Category deleted successfully",
    });
  }

  async updateCategory(req: Request, res: Response) {
    const data = req.body;
    const id = req.params.id as string;
    const category = await categoryService.updateCategory(id, data);
    res.status(200).json({
      status: "Success",
      data: {
        category,
      },
      message: "Category Updated Successfully",
    });
  }
}

export default new CategoryController();
