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
}

export default new CategoryController();
