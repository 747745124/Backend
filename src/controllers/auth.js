const User = require('../database/schemas/User');
const { comparePassword } = require('../utils/helper')

async function authLoginController(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        res.send({ message: "Email or password doesn't exist!" });
        return;
    }
    const userDB = await User.findOne({ email });
    if (!userDB) {
        response.status(401);
        response.send({ message: "Auth Failed" });
        return;
    }
    const isValid = comparePassword(password, userDB.password);
    if (isValid) {
        req.session.user = userDB;
        {
            res.status(200);
            res.send({ message: "Successful Login" });
        }
    } else {
        res.status(401);
        res.send({ message: "Unsuccess!" });
    }
}

module.exports = { authLoginController }