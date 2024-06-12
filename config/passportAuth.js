const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const User = require("../models/userModel");
const initializePassport = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, async (email,passport, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user || !passport) {
                    return done(null, false, {
                        message: "Incorrect Email or Passward",
                      });
                    }
                    return done(null, user);
                  } catch (error) {
        return done(error);
      }
    })
  );
};

passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
      try {
          const user = await User.findById(id);
          done(null, user);
        } catch (error) {
            done(error);
          }
        });

        module.exports = initializePassport;

// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const User = require("../models//userModel");

// passport.use(new LocalStrategy(User.authenticate())); // Use built-in authenticate method

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });

// module.exports = passport;
