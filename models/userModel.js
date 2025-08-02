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
    },
    'passwordResetToken': String,
    'passwordResetExpires': Date,
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




// Here we are basically creating our own token
userSchema.methods.createPasswordResetToken = function() {
    

  const resetToken = crypto.randomBytes(32).toString('hex');


//   This encrypts the rest token in the database where this represents Useschema
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  console.log({resetToken} , this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};




// userSchema.methods.createPasswordResetToken = function(){
//     const resetToken = crypto.randomBytes(32).toString('hex')

//     // we then encrypt the reset token and set it in our db
//     this.passwordResetToken = crypto.hash('sha256').update(resetToken).digest('hex');


//      console.log({resetToken} , this.passwordResetToken);
//     this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

//     return resetToken;




// }














const User = mongoose.model('User', userSchema)

module.exports = User