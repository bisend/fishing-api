import UserRepository from '../Repositories/UserRepository';
import { IUser } from '../interfaces/User';
import { hashPassword } from '../helpers/HashPassword';

export default class AuthService {
  public userRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async isUserExists(email: IUser['email']) {
    return this.userRepository.getUserByEmail(email);
  }

  async register(data: IUser) {
    data.password = await hashPassword(data.password);
    return this.userRepository.create(data);
  }
}
