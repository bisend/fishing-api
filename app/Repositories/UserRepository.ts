import User from '../Models/User';
import { IUser } from '../interfaces/user';

class UserRepository {
  async getUsers() {
    const users = User.find();
    return await users.then(data => data)
      .catch((err) => {
        console.log(err);
        return [];
      });
  }

  async create(data: IUser) {
    return User.create(data)
      .then(user => user)
      .catch((err) => {
        console.log(err);
        return null;
      });
  }
}

export default UserRepository;
