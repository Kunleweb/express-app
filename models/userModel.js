const mongoose = require('mongoose');
const validator = require('validator')


const userSchema = new mongoose.Schema({
    'name': {required: true, type: String},
    'email': {required: true, validate:[validator.isEmail, 'Please provide correct email format'], type:String},
    'password': {required:true, type: String, maxlength: 100, minlength: 10},

    'passwordConfirm': {required:true, type: String, maxlength: 100, minlength: 10,
        validate: {validator: function(el){return el === this.password}, 
        message: 'password and password confirm do not match'}
    }
})


const User = mongoose.model('User', userSchema)

module.exports = User