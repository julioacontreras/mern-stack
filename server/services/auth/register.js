const passport = require('passport');
const passportJWT = require('passport-jwt');

module.exports = (app, findUsername) => {
    const ExtractJwt = passportJWT.ExtractJwt;
    const JwtStrategy = passportJWT.Strategy;
  
    // settings
    const jwtOptions = {}
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey = process.env.ACCESS_TOKEN_SECRET;
    app.auth = {
      options: jwtOptions,
      middleware: {}
    };
    
    // create strategy
    const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
      const user = findUsername({username: jwt_payload.username});
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    });
    passport.use(strategy);
    
    // create mifflewares
    app.auth.middleware.isAuthenticated = passport.authenticate('jwt', { session: false })
    app.auth.middleware.logout = (req, res) => {
      req.logout();
      delete req.session;
      res.status(200).end();
    };

    // add in app
    app.use(passport.initialize());
}