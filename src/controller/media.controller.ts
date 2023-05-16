import { Request, Response, NextFunction } from "express";
import messages from "../customs/messages";
import mediaService from "../services/media.service";

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

  async getMedia( req: Request, res: Response) {
    let stream = await mediaService.getMedia(req.params.email, `${req.params.type}/${req.params.name}`)
    stream.pipe(res)
  }
}

export default new MediaController();
