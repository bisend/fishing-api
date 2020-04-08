import express from 'express';
import passport from 'passport';
const router = express.Router();
import { login, register, logout } from '../Controllers/AuthController';
import RequestValidator from '../middlewares/RequestValidator';
import { RegistrationValidator } from '../Validators/RegistrationValidator';
import { token } from '../server/oauth2';

router.post('/oauth/token', token);

router.post('/login', [], login);
router.post('/register', [RequestValidator(RegistrationValidator)], register);
router.post('/logout', [], logout);

export default router;
