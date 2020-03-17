import express from 'express';
const router = express.Router();
import { login, register, logout } from '../Controllers/AuthController';
import RequestValidator from '../middlewares/RequestValidator';
import { RegistrationValidator } from '../Validators/RegistrationValidator';

router.post('/login', [], login);
router.post('/register', [ RequestValidator(RegistrationValidator) ], register);
router.post('/logout', [], logout);

export default router;
