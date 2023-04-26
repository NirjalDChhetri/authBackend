import { AppDataSource } from "../config/database.config";
import { MediaDTO } from "../dtos/media.dto";
import { Media } from "../entity/media.entity";

export class MediaService {
  constructor(private mediaRepository = AppDataSource.getRepository(Media)) {}

  async uploadFile(data: MediaDTO) {
    let media = new Media();
    media.name = data.name
    media.mimType = data.mimeType
    media.type = data.type
    let newMedia = await this.mediaRepository.save(media)
    return newMedia;
  }
}
