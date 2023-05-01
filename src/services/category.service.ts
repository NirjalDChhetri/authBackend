import { AppDataSource } from "../config/database.config";
import messages from "../customs/messages";
import { CreateCategoryDTO } from "../dtos/category.dto";
import { BlogCategory } from "../entity/category.blog";
import HttpException from "../utils/HttpException";

class CategoryService {
  constructor(
    private categoryRepository = AppDataSource.getRepository(BlogCategory)
  ) {}

  async create(data: CreateCategoryDTO) {
    const { title } = data;
    if (!title) {
      throw HttpException.badRequest(messages["dataNotFound"]);
    }
    const category = await this.categoryRepository.create({
      title: title.toLowerCase(),
    });
    return this.categoryRepository.save(category);
  }
}

export default new CategoryService();
