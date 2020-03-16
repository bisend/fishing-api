import UserRepository from '../Repositories/UserRepository';

class UserService {
  public userRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUsers() {
    return await this.userRepository.getUsers();
  }
}

export default UserService;
