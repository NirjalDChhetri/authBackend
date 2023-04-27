import { Router } from "express";
import upload from "../middlewares/upload.middleware";
import { catchAsync } from "../utils/catchAsync";
import mediaController from "../controller/media.controller";



const router = Router()

router.post('/upload/single', upload.single('media'), catchAsync(mediaController.uploadSingle))


export default router;