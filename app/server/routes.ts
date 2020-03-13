import express from 'express';
import authRouter from '../Auth/routes';
const router = express.Router();

router.use('/auth', [], authRouter);

export default router;
