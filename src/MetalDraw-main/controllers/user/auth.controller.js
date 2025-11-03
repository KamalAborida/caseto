const passport = require('passport');
require("../../config/passport");

//////////////////////////////////////////////////////////////////////////////

exports.login = async (req, res) => {
    return passport.authenticate('user', { session: false }, async (err, passportUser, info) => {
        if (err) {
            console.log(err);
            
            return res.status(400).json({
                success: false,
                messageCode: '0001',
                error: "Login failed, please try again.",
                code: 400,
            });
        }

        if (!passportUser) {
            return res.status(400).json({
                success: false,
                messageCode: '0004',
                error: "Invalid email or password.",
                code: 400,
            });
        }

        if (passportUser) {
            const user = await passportUser.toAuthJSON();
            return res.json({ user });
        }

        res.status(400).send(info);
    })(req, res);


};