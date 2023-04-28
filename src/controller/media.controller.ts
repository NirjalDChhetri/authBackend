import { Request, Response, NextFunction } from "express";
import messages from "../customs/messages";

class MediaController {
  constructor() {}

  async uploadSingle(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({
      success: true,
      data: req.file,
      message: messages["mediaUploaded"],
    });
  }

  async uploadMultiple(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({
      success: true,
      data: req.file,
      message: messages["mediaUploaded"],
    });
  }
}

export default new MediaController();
