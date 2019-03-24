const Router = require('express-promise-router'),
    router = new Router(),
    _UTIL = require('../util/index'),
    { validateLoginForm, validateRegistrationForm } = require('../util/validator'),
    { validationResult } = require('express-validator/check'),
    User = require('../models/User'),
    bcryptjs = require('bcryptjs'),
    crypto = require('crypto')

router.post('/login', validateLoginForm(), async (req, res) => {
    const errors = validationResult(req).array()
    let statusCode, message , user = undefined ;

    try {
        if (errors.length === 0) {
            // updates user variable
            user = req.user
            // reset password to avoid exposure in the client-side
            user.password = null
            delete req.user

            statusCode = 200
            message = _UTIL.createMessage('Successful Login', 'Welcome to our site', 'positive')

        } else throw new Error()
    } catch (e) {
        statusCode = 400
        message = _UTIL.createMessage('Unsuccessful Login', errors[0].msg, 'negative', errors)
    }

    res.json({ statusCode, message , user })
})


router.post('/register', validateRegistrationForm(), async (req, res) => {
    const errors = validationResult(req).array()
    let statusCode, message , user = undefined ;

    try {
        if (errors.length === 0) {
            let { username, email, password } = req.body
            // hashing password
            password = await bcryptjs.hash(password, 12)
            // user instance
            user = new User({ username, email, password })
            // commit user instance to mongodb
            await user.save()

            statusCode = 200
            message = _UTIL.createMessage('Successful Login', 'Welcome to our site', 'positive')

        } else throw new Error()
    } catch (e) {
        statusCode = 400
        message = _UTIL.createMessage('Unsuccessful Login', errors[0].msg, 'negative', errors)
        console.log('ERROR: ', message)

    }

    res.json({ statusCode, message , user })
})

module.exports = router