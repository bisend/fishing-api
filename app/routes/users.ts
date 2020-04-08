import express from 'express';
const router = express.Router();
import { getUsers, createUser } from '../Controllers/UserController';
import passport from 'passport';
import RequestValidator from '../middlewares/RequestValidator';
import { UserCreationValidator } from '../Validators/UserCreationValidator';

// routes
router.get('/', getUsers);
router.post('/create', [
  passport.authenticate('bearer', { session: false }),
  RequestValidator(UserCreationValidator)
], createUser);

router.get('/info',
  passport.authenticate('bearer', { session: false }), (req, res) => {
    // req.authInfo is set using the `info` argument supplied by
    // `BearerStrategy`.  It is typically used to indicate a scope of the token,
    // and used in access control checks.  For illustrative purposes, this
    // example simply returns the scope in the response.
    if (req.user) {
      res.json({ user: req.user, scope: req.authInfo });
    }
  }
);

export default router;
