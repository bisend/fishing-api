import { Request, Response } from 'express';

export default function Exception(error: Error, req: Request, res: Response, next: Function) {
  res.statusCode = 500;
  return res.send({status: 'soso'});
}
