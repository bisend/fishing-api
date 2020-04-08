import oauth2orize from 'oauth2orize';
import passport from 'passport';
import crypto from 'crypto';
import User from '../Models/User';
import Client from '../Models/Auth/Client';
import AccessToken from '../Models/Auth/AccessToken';
import RefreshToken from '../Models/Auth/RefreshToken';
import { comparePasswords } from '../helpers/HashPassword';

// create OAuth 2.0 server
const server = oauth2orize.createServer();

// Destroy any old tokens and generates a new access and refresh token
function generateTokens (data, done) {

  // RefreshToken.deleteMany(data, errorHandler);
  // AccessToken.deleteMany(data, errorHandler);
  //
  // tokenValue = crypto.randomBytes(32).toString('hex');
  // refreshTokenValue = crypto.randomBytes(32).toString('hex');
  //
  // data.token = tokenValue;
  // token = new AccessToken(data);
  //
  // data.token = refreshTokenValue;
  // refreshToken = new RefreshToken(data);
  //
  // refreshToken.save(errorHandler);
  //
  // token.save(function (err) {
  //   if (err) {
  //
  //     log.error(err);
  //     return done(err);
  //   }
  //   done(null, tokenValue, refreshTokenValue, {
  //     'expires_in': config.get('security:tokenLife')
  //   });
  // });
}

// Exchange username & password for an access token.
server.exchange(oauth2orize.exchange.password((client, username, password, scope, done) => {
  User.findOne({ email: username }, async (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    const isEqual = await comparePasswords(password, user.password);
    if (!isEqual) { return done(null, false); }

    RefreshToken.deleteMany({ userId: user._id, clientId: client.clientId }, function (err) {
      if (err) return done(err);
    });
    AccessToken.deleteMany({ userId: user._id, clientId: client.clientId }, function (err) {
      if (err) return done(err);
    });

    const tokenValue = crypto.randomBytes(32).toString('base64');
    const refreshTokenValue = crypto.randomBytes(32).toString('base64');

    const token = new AccessToken({ token: tokenValue, clientId: client.clientId, userId: user._id });
    const refreshToken = new RefreshToken({ token: refreshTokenValue, clientId: client.clientId, userId: user._id });
    await refreshToken.save((err) => {
      if (err) { return done(err); }
    });
    const info = { scope: '*' };
    await token.save((err, token) => {
      if (err) { return done(err); }
      done(null, tokenValue, refreshTokenValue, { scope: '*', 'expires_in': Number(process.env.TOKEN_LIFE) });
    });
  });
}));

// Exchange refreshToken for an access token.
// server.exchange(oauth2orize.exchange.refreshToken((client, refreshToken, scope, done) => {
//   console.log('exchange refreshToken');
//   RefreshToken.findOne({ token: refreshToken }, (err, token) => {
//     if (err) { return done(err); }
//     if (!token) { return done(null, false); }
//     if (!token) { return done(null, false); }
//
//     User.findById(token.userId, (err, user) => {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//
//       RefreshToken.remove({ userId: user._id, clientId: client.clientId }, (err) => {
//         if (err) return done(err);
//       });
//       AccessToken.remove({ userId: user._id, clientId: client.clientId }, (err) => {
//         if (err) return done(err);
//       });
//
//       const tokenValue = crypto.randomBytes(32).toString('hex');
//       const refreshTokenValue = crypto.randomBytes(32).toString('hex');
//
//       const token = new AccessToken({ token: tokenValue, clientId: client.clientId, userId: user._id });
//       const refreshToken = new RefreshToken({ token: refreshTokenValue, clientId: client.clientId, userId: user._id });
//       refreshToken.save((err) => {
//         if (err) { return done(err); }
//       });
//       const info = { scope: '*' };
//       token.save(function (err, token) {
//         if (err) { return done(err); }
//         done(null, tokenValue, refreshTokenValue, { scope: '*', 'expires_in': Number(process.env.TOKEN_LIFE) });
//       });
//     });
//   });
// }));

// token endpoint
export const token = [
  passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
  server.token(),
  server.errorHandler()
];
