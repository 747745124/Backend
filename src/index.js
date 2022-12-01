const express = require('express');
const groceryRoute = require('./routes/groceries')
const marketsRoute = require('./routes/markets')
const authRoute = require('./routes/auth')
const passport = require('passport')
const MongoStore = require('connect-mongo')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const app = express();
const PORT = 8080;
// const memoryStore = new session.MemoryStore();

require('./database');

app.use(cookieParser());

//session saved in database
app.use(session({
    secret: 'ABRACADABRA', resave: false, saveUninitialized: false, store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/expressjs_tutorial',
    })
}));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`);
    next();
});

// app.use((req, res, next) => {
//     console.log(memoryStore);
//     next();
// })

//the order is important


app.use(passport.initialize());
app.use(passport.session());

// require('./strategies/local')
require('./strategies/discord')
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
