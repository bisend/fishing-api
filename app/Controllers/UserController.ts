import UserService from '../Services/UserService';
import { IUser } from '../interfaces/user';

const userService = new UserService();

export const getUsers = async (req, res) => {
  const users = await userService.getUsers();
  return res.json(users);
};

export const createUser = async (req, res) => {
  // const newUser = {
  //   email: 'new email2',
  //   password: 'string',
  //   phone_number: 'phone',
  //   first_name: 'fname',
  //   last_name: 'lname',
  // } as IUser;
  // const user = await userService.create();
  // return res.json(user);
};
