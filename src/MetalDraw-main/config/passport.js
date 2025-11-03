const passport = require("passport");
const LocalStrategy = require('passport-local');
const User = require("../models/user.model");

passport.use('user', new LocalStrategy({ usernameField: 'emailAddress', passReqToCallback: true },
    (req, emailAddress, password, done) => {
        User.findOne({ where: { emailAddress } }).then((user) => {
            if (!user) {
                return done(null, false, { messageCode: '0002', error: { message: 'Incorrect mix of E-mail address and password' } });
            }

            if (!user.validatePassword(password)) {
                return done(null, false, { messageCode: '0003', error: { message: 'Incorrect password.' } });
            }

            if (!user || !user.validatePassword(password)) {
                return done(null, false, { messageCode: '0002', error: { message: 'Incorrect mix of E-mail address and password' } });
            }

            return done(null, user);
        }).catch(done);
    }
));

