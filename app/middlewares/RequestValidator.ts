import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export default function RequestValidator(ValidatorClass) {
  return async (req: Request, res: Response, next: Function) => {
    const obj = plainToClass(ValidatorClass, req.body);
    validate(obj, { validationError: { target: false } }).then(err => console.log(err));
    next(new Error());
  };
}
