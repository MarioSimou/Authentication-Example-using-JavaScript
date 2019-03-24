const { Schema , model } = require('mongoose'),
      bcryptjs = require('bcryptjs');

const UserSchema = new Schema({
    username : { type : String , required : true , unique : true },
    email : { type : String , required : true , unique : true },
    password : { type : String , require : true , unique : true }
})

// Custom validator
UserSchema.methods.validatePassword = function ( password ){
    return bcryptjs.compare( password , this.password )
}

// schema constructor
const User = model( 'User' , UserSchema )



module.exports = User
