const express = require('express'),
      app = express(),
      port = process.env.PORT || 3001,
      mainRoutes = require('./controllers/main'),
      formRoutes = require('./controllers/forms'),
      bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use( bodyParser.urlencoded({ extended : true }) )
// parse application/json
app.use( bodyParser.json() )

// middleware 
app.use( ( req , res , next ) => {
    res.setHeader('Access-Control-Allow-Origin' , 'http://localhost:3000')
    next()
})

// Routes
app.use( formRoutes )
app.use( mainRoutes )

app.listen( port , () => {
    console.log(`The app listens on port ${ port }`)
})