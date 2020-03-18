import { Request, Response } from 'express';
import AuthService from '../Services/AuthService';
import BaseError from '../errors/BaseError';

const authService = new AuthService();

export const login = async (req: Request, res: Response) => {

};

export const register = async (req: Request, res: Response, next: Function) => {
  const { email } = req.body;
  try {
    const user = await authService.isUserExists(email);
    if (user) {
      return next(new BaseError({ message: 'Вы не можете использовать этот e-mail' }));
    }
    const result = await authService.register(req.body);
    return res.send({ success: !!result });
  } catch (e) {
    return next(new BaseError({}));
  }
};

export const logout = async (req: Request, res: Response) => {

};
