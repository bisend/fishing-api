import { Request, Response } from 'express';
import UserService from '../Services/UserService';
import { IUser } from '../interfaces/User';
import BaseError from '../errors/BaseError';

const userService = new UserService();

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  return res.json(users);
};

export const createUser = async (req: Request, res: Response, next: Function) => {
  const { email } = req.body;
  try {
    const user = await userService.isUserExists(email);
    if (user) {
      return next(new BaseError({ message: 'Вы не можете использовать этот e-mail' }));
    }
    const result = await userService.create(req.body as IUser);
    return res.json(result);
  } catch (e) {
    return next(new BaseError({}));
  }
};
