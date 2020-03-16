import UserService from '../Services/UserService';

const userService = new UserService();

export const getUsers = async (req, res) => {
  const users = await userService.getUsers();
  return res.json(users);
};

export const createUser = async (req, res) => {
  const newUser = {
    email: 'new email',
    password: 'string',
    phone_number: 'phone',
    first_name: 'fname',
    last_name: 'lname',
  };
  const user = await userService.create(newUser);
  return res.json(user);
};
