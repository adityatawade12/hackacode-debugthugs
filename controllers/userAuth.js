const bcrypt = require("bcryptjs")
const User = require("../models/User")
const passport = require("passport")

const ensureAuthenticated=(req,res,next)=>{
    if(req.isAuthenticated()){
        res.status(200).json({auth:true})
    }else{
        res.status(401).json({auth:false})
    }
}


const loginUser=(req,res,next)=>{
    passport.authenticate("local",(err,user,info)=>{
        if(err) res.status(500).json({msg:"there was an error",userData:{}})
        if(!user){
            res.status(404).json({msg:"No user with these credential exists",userData:{}})
        }
        else{
            req.logIn(user,err=>{
                if (err) res.status(500).json({msg:"there was an error",userData:{}})
                res.status(200).json({msg:"Successfully login",userData:user})
            })
        }
        
        

    })(req,res,next)
}

const registerUser=(req,res,next)=>{
    const{name,email,password,type}=(req.body)
        console.log(req.body)

        User.findOne({email:email})
        .then(user=>{
            if(user){
                errors.push({msg:"User already exists"})
                res.status(409).json({
                    
                    name, email,password,type
                })
            }else{
                const newUser=new User({
                    name,email,password,type
                })
                //Hash password
                bcrypt.genSalt(10,(err,salt)=>
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err) res.status(500).json({msg:"there was an error",userData:{}})
                        newUser.password=hash

                        newUser.save()
                        .then(user=>{
                            
                            // req.flash('success_msg',"you are now registered")
                            res.status(200).json({msg:"Successfully registered",userData:user})})
                        .catch(err=>{
                            console.log(err)
                            res.status(500).json({msg:"there was an error",userData:{}})
                        })
                }))

            }
        })
    


}

const logoutUser=(req,res,next)=>{
    req.logout()
    res.status(200).json({msg:"userLoggedOut",userData:{}})
}

const currentUser=(req,res,next)=>{
    if(req.user){
        const userObj = {email:req.user.email,type:req.user.type,name:req.user.name}
        res.status(200).json({msg:"user found",userData:userObj})
    }
    else{
        res.status(404).json({msg:"no user logged in",userData:{}})
    }
}

module.exports={
    loginUser,
    registerUser,
    ensureAuthenticated,
    logoutUser,
    currentUser
}