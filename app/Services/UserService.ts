import UserRepository from '../Repositories/UserRepository';
import { IUser } from '../interfaces/User';
import { hashPassword } from '../helpers/HashPassword';

class UserService {
  public userRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async isUserExists(email: IUser['email']) {
    return this.userRepository.getUserByEmail(email);
  }

  async getUsers() {
    return this.userRepository.getUsers();
  }

  async create(user: IUser) {
    user.password = await hashPassword(user.password);
    return this.userRepository.create(user);
  }
}

export default UserService;
