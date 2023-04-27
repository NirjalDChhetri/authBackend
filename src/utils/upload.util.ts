import { UploadedFile } from 'express-fileupload'
import path from 'path'
import fs from 'fs'
import { MediaType } from '../constants/enum'
import HttpException from './HttpException'
import messages from '../customs/messages'

const PUBLIC_FOLDER_PATH = path.join(__dirname, '..', '..', 'public')
const UPLOADS_FOLDER_PATH = path.join(__dirname, '..', '..', 'public', 'temp')

const uploadHelper = (filename: string, file: UploadedFile, type: MediaType) => {
    return new Promise((resolve, reject) => {
        const fileExtension = path.extname(file.name)
        const fileSize = file.size

        let supportedExtensions: String []

        let maxFileSize: number

        switch (type) {
            case MediaType.PROFILE_PICTURE:
            supportedExtensions = ['.png', '.jpg','.jpeg']
            maxFileSize = 4 * 1024 * 1024 //* 4 MB
            break
            case MediaType.DOCUMENT:
                supportedExtensions = [ '.png', '.jpg', '.jepg', '.pdf']
                maxFileSize = 10 * 1024 * 1024 //* 10 MB
            break

            default:
                throw HttpException.badRequest('Invalid media type')
        }
    })
}