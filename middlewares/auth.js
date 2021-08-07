const isLoggedin=(req,res,next)=>{
    if(req.isAuthenticated()){
        next()
    }else{
        res.send("no login")
    }
}

const isUser=(req,res,next)=>{
    if(req.user.type=="user"){
        next()
    }else{
        res.send("no user")
    }
}


const isNGO=(req,res,next)=>{
    if(req.user.type=="ngo"){
        console.log(req.user._id);
        req.userId = req.user._id;
        next()
    }else{
        res.send("no ngo")
    }
}


const isVolunteer=(req,res,next)=>{
    if(req.user.type=="volunteer"){
        next()
    }else{
        res.send("no volunteer")
    }
}


module.exports={
    isLoggedin,
    isNGO,
    isUser,
    isVolunteer
}