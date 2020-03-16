import express from 'express';
const router = express.Router();
import { getUsers, createUser } from '../Controllers/UserController';

// routes
router.get('/', getUsers);
router.get('create', (req, res) => {
  return res.send(123123);
});

export default router;
