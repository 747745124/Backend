const express = require('express');
const groceryRoute = require('./routes/groceries')
const marketsRoute = require('./routes/markets')
const authRoute = require('./routes/auth')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const app = express();
const PORT = 8080;

require('./database');

app.use(cookieParser());

app.use(session({ secret: 'ABRACADABRA', resave: false, saveUninitialized: false }));
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`);
    next();
});

//the order is important
// app.use((req, res, next) => {
//     if (req.session.user) { next(); }//use middleware to block sessions
//     else { res.status(401).send({ message: "Not logged in" }); }
// })

app.use(passport.initialize());
app.use(passport.session());

app.use('/groceries', groceryRoute);//register the route with prefix
app.use('/markets', marketsRoute);
app.use('/auth', authRoute);



app.listen(PORT, () => { console.log(`listening on port: ${PORT}`); });



// app.post('/tshirt/:id', (req, res) => {
//     const { id } = req.params;
//     const { logo } = req.body;

//     if (!logo) {
//         res.status(418).send({ message: 'We need a logo!' });
//     }

//     res.send({ tshirt: `👔 with your ${logo} and ID of ${id}` });
// })
