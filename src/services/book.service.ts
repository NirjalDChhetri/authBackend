import { AppDataSource } from "../config/database.config";
import { CreateBookDTO } from "../dtos/book.dto";
import { Book } from "../entity/book.entity";
import { BookCategory } from "../entity/bookCategory.entity";
import { Media } from "../entity/media.entity";
import mediaService from "./media.service";

class BookService {
  constructor(
    private bookRepository = AppDataSource.getRepository(Book),
    private categoryRepository = AppDataSource.getRepository(BookCategory),
    private mediaRepository = AppDataSource.getRepository(Media)
  ) {}

  async createBook(data: CreateBookDTO) {
    const { name, author, description, genre, categories } = data;
    let book = new Book();
    book.name = name;
    book.author = author;
    book.description = description;
    if (categories) {
      let categoryData: BookCategory[] = [];
      for (let i = 0; i < categories.length; i++) {
        let data = await this.categoryRepository.findOne({
          where: {
            id: categories[i],
          },
        });
        if (data) {
          categoryData.push(data);
        }
      }
      book.categories = categoryData;
    }
    book.genre = genre;
    if (data.images) {
      let media = await mediaService.uploadMultipleFile(data.images);
      book.images = media;
    }
    return await this.bookRepository.save(book);
  }
}

export default new BookService();
