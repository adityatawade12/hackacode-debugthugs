const express = require('express')
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const ejsMate = require('ejs-mate')
const ejs = require('ejs')
require("dotenv").config();
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const ExpressError = require('./utils/ExpressError')
const { MongoClient } = require('mongodb');

const { Cookie } = require('express-session');

mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        console.log("Mongoose connection successful!!")
    })
    .catch((err) => {
        console.log(`Error: ${err.message}`)
    });

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
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('landing')
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