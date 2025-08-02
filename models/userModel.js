const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt');
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    'name': {required: true, type: String},
    'email': {required: true, validate:[validator.isEmail, 'Please provide correct email format'], type:String},
    'password': {required:true, type: String, maxlength: 100, minlength: 10},
    'passwordChangedAt':Date,
    'roles': {type: String, enum:['user', 'admin'], default:'user'},

    'passwordConfirm': {required:true, type: String, maxlength: 100, minlength: 10,
        validate: {validator: function(el){return el === this.password}, 
        message: 'password and password confirm do not match'}
    }
})

// We want to create a document middleware for hashing our passwords;

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    // we basically then set password confirm to undefined because, it isnt needed in the DB
    this.passwordConfirm = undefined;
    next()
} )


userSchema.methods.correctPassword =async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPassword = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime()/1000, 10);
        return JWTTimestamp < changedTimestamp;}

        return false;            
}





















const User = mongoose.model('User', userSchema)

module.exports = User