const Router = require('express-promise-router')
const router = new Router();
const _UTIL = require('../util/index');

router.post('/login', async ( req , res ) => {
    console.log('inside login post')
    console.log(req.body)
    const statusCode = 200
    const message = _UTIL.createMessage( 'Successful Connection' , 'Welcome to our site' , 'positive')

    res.json({ statusCode , message }) 
})


router.post('/register', async ( req , res ) => {
    console.log('inside register post')
    console.log(req.body)
    const statusCode = 200
    const message = _UTIL.createMessage( 'Successful Connection' , 'Welcome to our site' , 'positive')

    res.json({ statusCode , message }) 
})

module.exports = router