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
const { search } = require('./controllers/search')
const cors=require("cors")
const { Cookie } = require('express-session');
require("./config/mongoose")
require("./config/passport")(passport)
const socketio = require('socket.io');

app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')))
app.use(flash());
app.use(methodOverride('_method'))

app.use(cors())
const server = app.listen(3000)

const io = require('socket.io').listen(server)

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
app.use("/volunteer", require('./routes/volunteer'))
app.use("/feed",require("./routes/feed"))


app.get('/', (req, res) => {
    res.render('landing')
})
app.get('/login', async (req, res) => {
    let type = req.query['type']
    const s = await search();
    res.render('login', { type })
})


app.get('/apply', (req, res) => { 
    res.render('ngos/applyngo') 
})

app.get('/dashboard', (req, res) => {
    res.render('ngos/dashboard.ejs')
})

app.get('/icons', (req, res) => {
    res.render('ngos/icons.ejs')
})
app.get('/map', (req, res) => {
    res.render('ngos/map.ejs')
})
app.get('/events', (req, res) => {
    res.render('ngos/events.ejs')
})
// app.get('/events/view', (req, res) => {
//     res.render('ngos/viewEvent.ejs')
// })
// app.get('/events/create', (req, res) => {
//     res.render('ngos/createEvent.ejs')
// })
app.get('/tables', (req, res) => {
    res.render('ngos/tables.ejs')
})
// app.get('/typography', (req, res) => {
//     res.render('ngos/typography.ejs')
// })
app.get('/upgrade', (req, res) => {
    res.render('ngos/upgrade.ejs')
})
// app.get('/user', (req, res) => {
//     res.render('ngos/user.ejs')
// })

app.get("/feed",(req,res)=>{
    res.render("feed")
})

// app.all("*", (req, res, next) => {
//     next(new ExpressError("Page not found", 404));
// })
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh No Error"
    res.status(statusCode).render('error', { err });
})

app.get('*', (req, res) => {
    res.render('pageNotFound');
})


// app.listen(3000, () => {
//     console.log("Listening on port 3000");
// })

/////////////////////////////////////////////////////////////////////////////////////////////////////////

const{ userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    formatMessage}=require("./utils/chat")

const botName = 'ChatCord Bot';

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    console.log("asdasd")
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});