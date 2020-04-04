import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { Strategy as ClientPasswordStrategy } from 'passport-oauth2-client-password';
import { Strategy as BearerStrategy } from 'passport-http-bearer';

passport.use(new BasicStrategy((userid, password, done) => {
    // User.findOne({ username: userid }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) { return done(null, false); }
    //   if (!user.verifyPassword(password)) { return done(null, false); }
    //   return done(null, user);
    // });
  }
));

passport.use(new ClientPasswordStrategy((clientId, clientSecret, done) => {
    // ClientModel.findOne({ clientId: clientId }, function(err, client) {
    //   if (err) { return done(err); }
    //   if (!client) { return done(null, false); }
    //   if (client.clientSecret != clientSecret) { return done(null, false); }
    //
    //   return done(null, client);
    // });
  }
));

passport.use(new BearerStrategy((accessToken, done) => {
    // AccessTokenModel.findOne({ token: accessToken }, function(err, token) {
    //   if (err) { return done(err); }
    //   if (!token) { return done(null, false); }
    //
    //   if( Math.round((Date.now()-token.created)/1000) > config.get('security:tokenLife') ) {
    //     AccessTokenModel.remove({ token: accessToken }, function (err) {
    //       if (err) return done(err);
    //     });
    //     return done(null, false, { message: 'Token expired' });
    //   }
    //
    //   UserModel.findById(token.userId, function(err, user) {
    //     if (err) { return done(err); }
    //     if (!user) { return done(null, false, { message: 'Unknown user' }); }
    //
    //     var info = { scope: '*' }
    //     done(null, user, info);
    //   });
    // });
  }
));
