const User = require('./models/userModel');


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




