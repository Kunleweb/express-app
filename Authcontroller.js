const User = require('./models/userModel');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');



// we create a a sign token 
// SO THIS USES THE ID/HEADER ASSIGNED BY MONGO WITH THE SECRET WE CREATED TO CREATE A SIGNATURE
const signToken = id =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}


exports.createUser = async(req,res,next)=>{
    try{const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm})
        res.status(200).json({status:'success', data:user})
    
    }catch(err){res.status(400)
            .json({status:'something went wrong', message:err.message})}

    

}

exports.login = async(req, res, next) =>{
    try{  const {email, password} = req.body;
    if(!email||!password) return next(res.status(400).json({status:'Please provide details'}));
    console.log('test')
    const user = await User.findOne({email}).select('+password')
    if(!user||!await user.correctPassword(password, user.password))
        return next(res.status(401).json({status:'wrong details'}));

    

    // Here we want to send token to client
    const token = signToken(user._id)
    res.status(200).json({status:'success', token})




 






    }catch(err){
        res.status(400)
            .json({status:'something went wrong', message:err.message})

    }
}
