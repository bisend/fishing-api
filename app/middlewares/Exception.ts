import { Request, Response } from 'express';
import BaseError from '../errors/BaseError';

export default (error: Error | BaseError, req: Request, res: Response, next: Function) => {
  if (error instanceof BaseError) {
    res.statusCode = error.statusCode as number;
    return res.send(error);
  } else {
    res.statusCode = 500;
    return res.send(new BaseError({ statusCode: 500, message: 'Internal server error' }));
  }
}
