import { Request, Response } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import BaseError, { IError } from '../errors/BaseError';

export default function RequestValidator(ValidatorClass) {
  return async (req: Request, res: Response, next: Function) => {
    try {
      const obj = plainToClass(ValidatorClass, req.body);
      validate(obj, { validationError: { target: false } }).then((errors) => {
        const messages: IError['messages'] = {};
        if (!errors.length) {
          next();
        } else {
          errors.forEach((err: ValidationError) => (messages[err.property] = Object.values(err.constraints)));
          next(new BaseError({ messages }));
        }
      });
    } catch (e) {
      next(new BaseError({}));
    }
  };
}
