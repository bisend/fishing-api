import express from 'express';
const router = express.Router();
import { getUsers } from '../Controllers/UserController';

router.get('/', getUsers);

export default router;
