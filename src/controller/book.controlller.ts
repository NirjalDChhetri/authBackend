import { Request, Response, NextFunction } from "express";
import { CreateBookDTO } from "../dtos/book.dto";
import bookService from "../services/book.service";

class BookController {
  constructor() {}

  async createBook(req: Request, res: Response, next: NextFunction) {
    const data = req.body as CreateBookDTO;
    const book = await bookService.createBook(data);
    res.status(200).json({
      status: "success",
      data: {
        book,
      },
      message: "Book created Successfully",
    });
  }
}

export default new BookController()
