const Router = require('express-promise-router')
const router = new Router()

// Home Route
router.get( '/' , async ( req , res ) => {
    res.send('Hello World')
})

module.exports = router