const { body } = require('express-validator/check'),
       _UTIL = require('../util/index'),
       User = require('../models/User'),
       bcryptjs = require('bcryptjs');


const hasValue = v => {
    if (_UTIL.hasValue(v)) return true
    else throw new Error()
}

const validateLoginForm = () => {
    return [
        body('email')
            .custom(v => hasValue(v))
            .withMessage('Please fill all the values.')
            .isEmail()
            .withMessage('No valid email address.')
            .custom( async ( email , { req } ) => {
                const user = await User.findOne({ email })
                if( user ){
                    // assigns the user to request object to make it globally available
                    req.user = user;
                    return true
                }else throw new Error()  
            })
            .withMessage('This email address has not been registered. Please re-enter your email address or sign up if you have not done it yet.'),
        body('password')
            .custom(v => hasValue(v))
            .withMessage('Please fill all the values.')
            .isLength({ min: 8 })
            .withMessage('Invalid password. The password needs to have at least 8 alphanumeric characters.')
            .isAlphanumeric()
            .withMessage('Invalid password. The password needs to have at least 8 alphanumeric characters.')
            .custom( async ( password , { req } ) => {
                // validation middleware of user password
                const { user } = req
                const isValid = await user.validatePassword( password )
                
                if( isValid ) return true
                else throw new Error() 
            })
            .withMessage('The paassword is incorrect.')
    ]
}

const validateRegistrationForm = () => {
    return [
        body('username')
            .custom(v => hasValue(v))
            .withMessage('Please fill all the values.')
            .custom( async v =>  {
                const user = await User.findOne({ username : v })

                if( user ) throw new Error()
                else return true
            })
            .withMessage('A user with the same username already exists.'),
        body('email')
            .custom(v => hasValue(v))
            .withMessage('Please fill all the values.')
            .isEmail()
            .withMessage('No valid email address.')
            .custom( async v =>  {
                const user = await User.findOne({ email : v })

                if( user ) throw new Error()
                else return true
            })
            .withMessage('A user with the same email already exists.'),
        body('password')
            .custom(v => hasValue(v))
            .withMessage('Please fill all the values.')
            .isLength({ min: 8 })
            .withMessage('Invalid password. The password needs to have at least 8 alphanumeric characters.')
            .isAlphanumeric()
            .withMessage('Invalid password. The password needs to have at least 8 alphanumeric characters.')
            .custom( ( v , { req } ) => { 
                if( v === req.body.confPassword ) return true
                else throw new Error()
            } )
            .withMessage('Passwords do not match.'),
        body('confPassword')
            .custom(v => hasValue(v))
            .withMessage('Please fill all the values.')
            .isLength({ min: 8 })
            .withMessage('Invalid password. The password needs to have at least 8 alphanumeric characters.')
            .isAlphanumeric()
            .withMessage('Invalid password. The password needs to have at least 8 alphanumeric characters.')
            .custom( ( v , { req } ) => { 
                if( v === req.body.password) return true
                else throw new Error()
            } )
            .withMessage('Passwords do not match.')

    ]
}


module.exports = { validateLoginForm, validateRegistrationForm }