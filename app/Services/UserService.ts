import UserRepository from '../Repositories/UserRepository';
import { IUser } from '../interfaces/User';

class UserService {
  public userRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUsers() {
    return this.userRepository.getUsers();
  }

  async create(user: IUser) {
    return this.userRepository.create(user);
  }
}

export default UserService;
