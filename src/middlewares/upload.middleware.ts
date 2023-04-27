import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import { MediaType } from "../constants/enum";
import HttpException from "../utils/HttpException";
import { randomBytes } from "crypto";
import uploadHelper from "../utils/upload.util";

let mediaTypes = Object.values(MediaType);

const upload = {
  single: (fieldName: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (!req.files) {
        throw HttpException.badRequest("No file uploaded");
      }
      //Make sure that only one file is uploaded
      if (Object.keys(req.files).length !== 1) {
        throw HttpException.badRequest("Only one file is uploaded");
      }
      if (!mediaTypes.includes(req.body.type)) {
        throw HttpException.badRequest("Invalid media type");
      }
      try {
        const file = req.files[fieldName] as UploadedFile;

        const fileName = `${Date.now()}_${randomBytes(3).toString("hex")}_${
          file.name
        }`;
        await uploadHelper(fileName, file, req.body.type);

        req.file = {
          name: fileName,
          mimetype: file.mimetype,
          type: req.body.type,
        };

        next();
      } catch (error) {
        next(error);
      }
    };
  },
};
export default upload;
