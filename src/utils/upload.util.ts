import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from "fs";
import { MediaType } from "../constants/enum";
import HttpException from "./HttpException";

const PUBLIC_FOLDER_PATH = path.join(__dirname, "..", "..", "public");
const UPLOADS_FOLDER_PATH = path.join(__dirname, "..", "..", "public", "temp");

const uploadHelper = (
  fileName: string,
  file: UploadedFile,
  type: MediaType
) => {
  return new Promise((resolve, reject) => {
    const fileExtension = path.extname(file.name);
    const fileSize = file.size;

    let supportedExtensions: String[];

    let maxFileSize: number;

    switch (type) {
      case MediaType.PROFILE_PICTURE:
        supportedExtensions = [".png", ".jpg", ".jpeg"];
        maxFileSize = 4 * 1024 * 1024; //* 4 MB
        break;
      case MediaType.DOCUMENT:
        supportedExtensions = [".png", ".jpg", ".jepg", ".pdf"];
        maxFileSize = 10 * 1024 * 1024; //* 10 MB
        break;
      case MediaType.BOOK_IMAGE:
        supportedExtensions = [".png", ".jpg", ".jpeg"];
        maxFileSize = 4 * 1024 * 1024; //* 4 MB
        break;

      default:
        throw HttpException.badRequest("Invalid media type");
    }
    let isValidateExtension = supportedExtensions.includes(fileExtension);
    let isValidateFileSize = fileSize <= maxFileSize;

    if (!isValidateExtension)
      throw HttpException.badRequest(
        `Invalid file format only ${supportedExtensions.join(
          ","
        )} files are supported`
      );

    if (!isValidateFileSize)
      throw HttpException.badRequest(
        `File size too large maximum file size is ${maxFileSize / 1000000} MB`
      );

    const folderPath = path.join(UPLOADS_FOLDER_PATH, type);

    // Ensure that the folder exists
    !fs.existsSync(PUBLIC_FOLDER_PATH) && fs.mkdirSync(PUBLIC_FOLDER_PATH);
    !fs.existsSync(UPLOADS_FOLDER_PATH) && fs.mkdirSync(UPLOADS_FOLDER_PATH);
    !fs.existsSync(folderPath) && fs.mkdirSync(folderPath);

    const filePath = path.join(folderPath, fileName);
    file.mv(filePath, (err: any) => {
      if (err) {
        reject({ error: "Cannot upload files" });
      } else {
        resolve(file);
      }
    });
  });
};

export default uploadHelper;
