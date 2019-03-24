const Router = require('express-promise-router')
const router = new Router();
const _UTIL = require('../util/index');
const { validateLoginForm, validateRegistrationForm } = require('../util/validator')
const { validationResult } = require('express-validator/check')


router.post('/login', validateLoginForm(), async (req, res) => {
    const errors = validationResult(req).array()
    let statusCode, message;
    console.log('=========================================')
    if (errors.length === 0) {
        statusCode = 200
        message = _UTIL.createMessage('Successful Login', 'Welcome to our site', 'positive')
    } else {
        statusCode = 400
        message = _UTIL.createMessage('Unsuccessful Login', errors[0].msg, 'negative', errors)
        console.log('ERROR: ', message)
    }

    res.json({ statusCode, message })
})


router.post('/register', validateRegistrationForm(), async (req, res) => {
    const errors = validationResult(req).array()
    let statusCode, message;
    console.log('=========================================')
    console.log(req.body)
    
    if (errors.length === 0) {
        statusCode = 200
        message = _UTIL.createMessage('Successful Login', 'Welcome to our site', 'positive')
    } else {
        statusCode = 400
        message = _UTIL.createMessage('Unsuccessful Login', errors[0].msg, 'negative', errors)
        console.log('ERROR: ', message)
    }

    res.json({ statusCode, message })
})

module.exports = router