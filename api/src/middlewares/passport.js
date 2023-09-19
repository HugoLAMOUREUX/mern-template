const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { SECRET } = require("../config/config");

// load up the user model
const User = require("../models/userModel");

function getToken(req) {
  let token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  if (!token) token = req.cookies.jwt;
  return token;
}

module.exports = function (app) {
  const opts = {};
  opts.jwtFromRequest = getToken;
  opts.secretOrKey = SECRET;

  passport.use(
    "user",
    new JwtStrategy(opts, async function (jwtPayload, done) {
      try {
        console.log("OUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
        const user = await User.findOne({ _id: jwtPayload._id.toString() });
        if (user) return done(null, user);
        else return done(null, false);
      } catch (error) {
        console.log(error);
      }
      return done(null, false);
    }),
  );

  passport.use(
    "admin",
    new JwtStrategy(opts, async function (jwtPayload, done) {
      try {
        const user = await User.findOne({ _id: jwtPayload._id.toString() });
        if (user && user.role === "admin") return done(null, user);
      } catch (error) {
        capture(error);
      }
      return done(null, false);
    }),
  );

  app.use(passport.initialize());
};
