import express from 'express';
import authRouter from './auth';
import usersRouter from './users';
const router = express.Router();
const baseUri = '/api/v1';

const apiUrl = (uri: string) => {
  return `${baseUri}${uri}`;
};

router.use(apiUrl('/auth'), [], authRouter);
router.use(apiUrl('/user'), [], usersRouter);

export default router;
