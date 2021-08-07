const express = require('express')
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate')
const ejs = require('ejs')
const passport = require('passport')
require("dotenv").config();
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const ExpressError = require('./utils/ExpressError')
const { MongoClient } = require('mongodb');

const { Cookie } = require('express-session');
require("./config/mongoose")
require("./config/passport")(passport)

app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')))
app.use(flash());
app.use(methodOverride('_method'))

const sessionConfig = {
    secret: 'ngo-management',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}


app.use(session(sessionConfig))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use("/auth", require("./routes/userAuth"))
app.use("/NGO", require('./routes/ngo'))
app.get('/', (req, res) => {
    res.render('landing')
})
app.get('/login', (req, res) => {
    let type = req.query['type']
    res.render('login',{type})
})
app.get('/show', (req, res) => {
    res.render('ngos/show')
})


app.all("*", (req, res, next) => {
    next(new ExpressError("Page not found", 404));
})
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh No Error"
    res.status(statusCode).render('error', { err });
})





app.listen(3000, () => {
    console.log("Listening on port 3000");
})
