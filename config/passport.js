const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("../data/helpers/usersDB");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

module.exports = passport =>
  passport.use(
    new JwtStrategy(opts, async function(jwt_payload, done) {
      try {
        const user = await db.findUser(jwt_payload.email);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        console.error(error);
      }
    })
  );
