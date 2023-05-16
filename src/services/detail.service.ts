import { AppDataSource } from "../config/database.config";
import messages from "../customs/messages";
import { CreateUserDetailsDTO } from "../dtos/user.dot";
import { Media } from "../entity/media.entity";
import { UserDetails } from "../entity/user.detail.entity";
import { User } from "../entity/user.entity";
import HttpException from "../utils/HttpException";

class UserDetailsService {
  constructor(
    private userDetailsRepository = AppDataSource.getRepository(UserDetails)
  ) {}

  async createDetails(
    user: User,
    profilePicture: Media,
    data: CreateUserDetailsDTO
  ) {
    const userDetails = await this.userDetailsRepository.findOne({
      where: {
        id: user.userdetails?.id,
      },
    });
    if (!userDetails) {
      throw HttpException.notFound(messages["dataNotFound"]);
    }
    userDetails.firstName = data.firstName;
    userDetails.middleName = data.middleName;
    userDetails.lastName = data.lastName;
    userDetails.dateOfBirth = new Date(data.dateOfBirth);
    userDetails.address = data.address;
    userDetails.phoneNumber = data.phoneNumber;
    userDetails.gender = data.gender;
    userDetails.profilePicture = profilePicture;
    user.isCompleted = true;
    await user.save();
    return await this.userDetailsRepository.save(userDetails);
  }
}

export default new UserDetailsService();
