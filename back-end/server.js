const express = require('express'),
    app = express(),
    port = process.env.PORT || 3001,
    mainRoutes = require('./controllers/main'),
    formRoutes = require('./controllers/forms'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    redisStore = require('connect-redis')( session ),
    cookieParser = require('cookie-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

// adds cookie parser
app.use( cookieParser() )

// middlewares
// app.use( cookieParser() )
// const hour = 60 * 60 * 1000;
// app.use( session({
//     store : new redisStore({ url : process.env.URI_REDIS_AUTH_PROJECT }),
//     saveUninitialized : false,
//     secret : 'secret',
//     resave : false,
//     cookie : { secure : false , httpOnly : true , maxAge : hour }
// }))

app.use((req, res, next) => {
    // if( req.session ){
    //     console.log('COOKIES ', req.cookies)
    //     console.log(req.session)
    //     console.log('successful connection with redis')
    // }
    res.setHeader('Access-Control-Allow-Origin', process.env.DNS_FRONT_END )
    next()
})

// Routes
app.use(formRoutes)
app.use(mainRoutes)

// mongodb://user:pwd@host:port/dbname
mongoose.connect(process.env.URI_MONGO_DB_AUTH_PROJECT, { autoIndex : false , useNewUrlParser: true }, (err, connect) => {
    if (!err) {
        console.log(`Successful connection to the database...`)
        app.listen(port, () => {
            console.log(`The app listens on port ${port}...`)
        })
    }
})

