import { AppDataSource } from "../config/database.config";
import messages from "../customs/messages";
import { CreateCategoryDTO } from "../dtos/bookCategory.dto";
import { BookCategory } from "../entity/bookCategory.entity";
import HttpException from "../utils/HttpException";

class CategoryService {
  constructor(
    private categoryRepository = AppDataSource.getRepository(BookCategory)
  ) {}

  async create(data: CreateCategoryDTO) {
    const { title } = data;
    if (!title) {
      throw HttpException.badRequest(messages["dataNotFound"]);
    }
    const category = this.categoryRepository.create({
      title: title.toLowerCase(),
    });
    return await this.categoryRepository.save(category);
  }
}

export default new CategoryService();
