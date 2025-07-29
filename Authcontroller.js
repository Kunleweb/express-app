const User = require('./models/userModel');
const bcrypt = require('bcrypt');


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

    res.status(200).json({status:'logged in'})



    // PRACTIVE JWT IMPLEMENTATION






    }catch(err){
        res.status(400)
            .json({status:'something went wrong', message:err.message})

    }
}
