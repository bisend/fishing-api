import User from '../Models/User';

class UserRepository {
  async getUsers() {
    const users = User.find();
    return await users.then(data => data);
  }
}

export default UserRepository;
