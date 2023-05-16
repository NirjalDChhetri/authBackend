import { createReadStream, existsSync } from "fs";
import path from 'path'
import { AppDataSource } from "../config/database.config";
import { MediaDTO } from "../dtos/media.dto";
import { Media } from "../entity/media.entity";
import HttpException from "../utils/HttpException";

const TEMP_FOLDER_PATH = path.join(__dirname, '..', '..', '..', 'public', 'temp') 
const PUBLIC_FOLDER_PATH = path.join(__dirname, '..', '..', '..', 'public', 'uploads')

class MediaService {
  constructor(private mediaRepository = AppDataSource.getRepository(Media)) {}

  async uploadFile(data: MediaDTO) {
    let media = new Media();
    media.name = data.name;
    media.mimType = data.mimeType;
    media.type = data.type;
    const newMedia = await this.mediaRepository.save(media);
    return newMedia;
  }

  async uploadMultipleFile(data: MediaDTO[], email: string) {
    let mediaList: Media[] = []
    for (let i=0; i<data.length; i++) {
      if(!existsSync(path.join(TEMP_FOLDER_PATH, data[i].type, data[i].name))) {
        throw HttpException.badRequest(`File doesn't exist`)
      }
      let newMedia = new Media()
      newMedia.mimType = data[i].mimeType
      newMedia.name = data[i].name
      newMedia.type = data[i].type

      let media = await this.mediaRepository.save(newMedia)
      mediaList.push(media)
    }
    return [...mediaList]
  }
async getMedia(email: string, url:string) {
  let folderName = email.replace('@gmail.com', '')
  let fileLocation = path.join(PUBLIC_FOLDER_PATH, folderName, url)
  if(!existsSync(fileLocation)) {
    throw HttpException.badRequest(`Sorry file doesn't exist`)
  }
  return createReadStream(fileLocation, { encoding: 'base64'})

}
}
export default new MediaService();
