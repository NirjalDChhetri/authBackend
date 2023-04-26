import { Request, Response, NextFunction } from "express"
import { MediaService } from "../services/media.service";
import messages from "../customs/messages";




class MediaController {
    constructor( private mediaService = new MediaService()){}

    async uploadSingle( req: Request, res: Response, next: NextFunction) {
        res.status(200).json({
            success: true,
            data: req.file,
            message: messages['mediaUploaded']
        })
    }
}


