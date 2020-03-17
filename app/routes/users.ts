import express from 'express';
const router = express.Router();
import { getUsers, createUser } from '../Controllers/UserController';

// routes
router.get('/', getUsers);
router.get('/create', [ ], createUser);

export default router;
