import User from '../Models/User';
import { IUser } from '../interfaces/user';

class UserRepository {
  async getUserByEmail(email: IUser['email']) {
    return User.find({ email }).then(user => user[0])
      .catch(err => null);
  }

  async getUsers() {
    const users = User.find();
    return await users.then(data => data)
      .catch(err => []);
  }

  async create(data: IUser) {
    return User.create(data)
      .then(user => user)
      .catch(err => null);
  }
}

export default UserRepository;
