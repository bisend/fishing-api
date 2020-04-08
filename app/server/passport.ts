import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { Strategy as ClientPasswordStrategy } from 'passport-oauth2-client-password';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import User from '../Models/User';
import AccessToken from '../Models/Auth/AccessToken';
import Client from '../Models/Auth/Client';
import {IUser} from "../interfaces/User";
import {comparePasswords} from "../helpers/HashPassword";
// import RefreshToken from '../Models/Auth/RefreshToken';

function verifyClient(clientId, clientSecret, done) {
  Client.findOne({clientId: process.env.CLIENT_ID}, (error, client) => {
    if (error) return done(error);
    if (!client) return done(null, false);
    if (client.clientSecret !== process.env.CLIENT_SECRET) return done(null, false);
    return done(null, client);
  });
}

passport.use(new BasicStrategy(verifyClient));

passport.use(new ClientPasswordStrategy(verifyClient));

passport.use(
  new BearerStrategy(
    (accessToken, done) => {
      console.log('bearer');
      AccessToken.findOne({ token: accessToken }, (err, token) => {
        console.log('bearer');
        if (err) { return done(err); }
        if (!token) { return done(null, false); }

        if (Math.round((Date.now() - token.created) / 1000) > Number(process.env.TOKEN_LIFE)) {
          AccessToken.remove({ token: accessToken }, (err) => {
            if (err) return done(err);
          });
          return done(null, false, { message: 'Token expired', scope: '*' });
        }

        User.findById(token.userId, (err, user) => {
          if (err) { return done(err); }
          if (!user) { return done(null, false, { message: 'Unknown user', scope: '*' }); }

          const info = { scope: '*' };
          done(null, user, info);
        });
      });
    }
  )
);
