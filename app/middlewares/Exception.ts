import { Request, Response } from 'express';
import BaseError from '../errors/BaseError';

export default function Exception(error: Error | BaseError, req: Request, res: Response, next: Function) {
  if (error instanceof BaseError) {
    res.statusCode = error.statusCode;
    return res.send(error);
  } else {
    res.statusCode = 500;
    return res.send(new BaseError(500, 'Internal server error'));
  }
}
