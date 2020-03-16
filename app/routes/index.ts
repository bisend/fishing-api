import express from 'express';
import authRouter from './auth';
import usersRouter from './users';
const router = express.Router();

router.use('/auth', [], authRouter);
router.use('/user', [], usersRouter);

export default router;
