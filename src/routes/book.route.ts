import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import bookControlller from "../controller/book.controlller";

const router = Router();

router.post("/", catchAsync(bookControlller.createBook.bind(bookControlller)));

export default router;
