const { Router, response } = require('express')
const User = require('../database/schemas/User')
const { hashPassword, comparePassword } = require('../utils/helper')
const router = Router();
const { authLoginController } = require('../controllers/auth')

//unit tests
router.post('/login', authLoginController);

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         return res.status(400).send({ message: "Email or password doesn't exist!" })
//     }
//     const userDB = await User.findOne({ email });
//     if (!userDB) return response.status(401).send({ message: "Auth Failed" });
//     const isValid = comparePassword(password, userDB.password);
//     if (isValid) {
//         req.session.user = userDB;
//         return res.status(200).send({ message: "Successful Login" });;
//     } else {
//         return res.status(401).send({ message: "Unsuccess!" });
//     }

// })

router.post('/register', async (req, res) => {
    const { email } = req.body;
    const userDB = await User.findOne({ email });
    if (userDB) {
        res.status(400).send({ message: 'user already exists!' })
    } else {
        const password = hashPassword(req.body.password);
        console.log(password);
        const newUser = await User.create({ password, email });
        res.status(201).send({ message: 'User created' })
    }

})
module.exports = router;