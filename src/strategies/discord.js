const passport = require('passport')
const { Strategy } = require('passport-discord')

passpsort.use(new Strategy({
    clientID: '1047705893384507504',
    clientSecret: 'hSEdU2Qi65_ZW9EqjK7_XRY-EWa8YYk-',
    callbackURL: 'http://localhost:8080/auth/discord/redirect',
    scope: ['identify']
}, async (accessToken, refreshToken, profile, done) => {

}))