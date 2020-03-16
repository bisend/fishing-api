import UserService from '../Services/UserService';

const userService = new UserService();

export const getUsers = async (req, res) => {
  const users = await userService.getUsers();
  return res.json(users);
};
