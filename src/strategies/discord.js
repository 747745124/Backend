const passport = require('passport')
const { Strategy } = require('passport-discord')
const DiscordUser = require('../database/schemas/DiscordUser')

passport.serializeUser((user, done) => {
    //called when the user is verified
    //attaching the user id to the session
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    // this function get called whenever an API is called.
    // console.log(id);
    const userDB = await DiscordUser.findById(id);
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


passport.use(new Strategy({
    clientID: '1047705893384507504',
    clientSecret: 'hSEdU2Qi65_ZW9EqjK7_XRY-EWa8YYk-',
    callbackURL: 'http://localhost:8080/auth/discord/redirect',
    scope: ['identify']
}, async (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, refreshToken, profile);
    const discordUser = await DiscordUser.findOne({ discordId: profile.id })
    if (discordUser) {
        console.log(`Found User ${discordUser}`)
        return done(null, discordUser)
    } else {


        const newUser = await DiscordUser.create({
            discordId: profile.id,
        })

        console.log(`New User Created ${newUser}`)

        return done(null, newUser);
    }
}))