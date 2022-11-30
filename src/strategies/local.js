const passport = require('passport')
const { Strategy } = require('passport-local')
const User = require('../database/schemas/User')
const { comparePassword, hashPassword } = require('../utils/helper')

passport.serializeUser((user, done) => {
    //called when the user is verified
    //attaching the user id to the session
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    // this function get called whenever an API is called.
    // console.log(id);
    const userDB = await User.findById(id);
    //attach user to the request
    try {
        if (userDB)
            done(null, userDB);
        else {
            throw new Error('User not found');
        }

    } catch (err) {
        console.log(err);
    }

}
);

passport.use(new Strategy(
    {
        //specify the username
        usernameField: 'email',

    }, async (email, password, done) => {
        console.log(email, password);
        try {
            if (!email || !password) {
                // done(
                //     new Error('Bad Equest. Missing Credentials'), null
                // )
                throw new Error('Bad Equest. Missing Credentials');
            }

            const userDB = await User.findOne({ email });

            if (!userDB) {
                throw new Error('User not found');
            }
            const isValid = comparePassword(password, userDB.password);

            if (isValid) {
                console.log('Authenticated Successfully')
                done(null, userDB);
                // now it need to serialize the user to the session
            }
            else {
                done(null, null);
            }
        } catch (err) {
            done(err, null);
        }
    }
));