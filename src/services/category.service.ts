import { AppDataSource } from "../config/database.config";
import messages from "../customs/messages";
import { CategoryDTO } from "../dtos/bookCategory.dto";
import { BookCategory } from "../entity/bookCategory.entity";
import HttpException from "../utils/HttpException";

class CategoryService {
  constructor(
    private categoryRepository = AppDataSource.getRepository(BookCategory)
  ) {}

  async create(data: CategoryDTO) {
    const { title } = data;
    if (!title) {
      throw HttpException.badRequest(messages["dataNotFound"]);
    }
    const category = this.categoryRepository.create({
      title: title.toLowerCase(),
    });
    return await this.categoryRepository.save(category);
  }

  async getAllCategories() {
    const catrogries = await this.categoryRepository.find();
    return catrogries;
  }

  async getCategoryById(id: string) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!category) {
      throw HttpException.notFound(messages["dataNotFound"]);
    }
    return category;
  }

  async deleteCategory(id: string) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!category) {
      throw HttpException.notFound(messages["dataNotFound"]);
    }
    return await this.categoryRepository.remove(category);
  }

  async updateCategory(id: string, data: CategoryDTO) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!category) {
      throw HttpException.notFound("Category not found");
    }
    category.title = data.title;
    const updateCategory = this.categoryRepository.save(category);
    if (!updateCategory) {
      throw HttpException.badRequest("Error on Update");
    }
    return updateCategory;
  }
}

export default new CategoryService();
