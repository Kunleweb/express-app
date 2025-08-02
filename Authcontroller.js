const User = require('./models/userModel');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const {promisify} = require('util');



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
    console.log(token)
    res.status(200).json({status:'success', token})




 






    }catch(err){
        res.status(400)
            .json({status:'something went wrong', message:err.message})

    }
}



exports.protect = async (req, res, next)=>{

    try{// We check if the request trying to acess the route has the toke
    let token 
    if (req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
        }

        if (!token){
           return next(res.status(401).json({status: 'failed', message: 'unauthorized'})) 
        }

        // Verify Token; 
        // understand that the token is generated from when a user logins and this stores the user id
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
        
        


        // Create a currentUSER;
        const currentUSER = await User.findById(decoded.id)
        if(!currentUSER){
            return next(res.status(404).json({status: 'failed', message: 'user does not exist'}))
        }


        // We want to check if password has been changed after the token was issued
        if(currentUSER.changedPassword(decoded.iat)){
            return next(res.status(401).json({status:fail, message:'unauthorized'}))
        };


        req.user = currentUSER;
        next();}catch(err){res.status(500).json({status:'fail', message: 'something happened'})}


    
}





exports.restrictTo = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(res.status(403).json({status:'no permission for this action'}))
        }
        next()

    }
}