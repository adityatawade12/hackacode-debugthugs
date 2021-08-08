const Post=require("../models/Feed")
var timeAgo = require('node-time-ago');
const NGO = require('../models/Ngo');

const createPost=async(req,res)=>{
    let name
    let authorImg
    
    if(req.user.type=="NGO"){
        console.log(req.user._id)
        const ngo=await NGO.findOne({userId:req.user._id})
        console.log(ngo)
        console.log(ngo.NgoName)
        name=ngo.NgoName
        authorImg=ngo.logo
        console.log("name",name)
    }else{
        name=req.user.name
        authorImg=req.user.profilePic||"https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"
    }
    console.log(name)
    const newPost=new Post({author:name,authorImg:authorImg,text:req.body.text,postImg:'https://drive.google.com/thumbnail?id='+req.file.fileId,authorId:req.user._id,heading:req.body.heading})
    newPost.save()
    .then(post=>{
        // res.send(post)
        res.redirect("/NGO/myPosts")
    })
    .catch(err=>{
        res.send(err)
    })
}

const getAllposts=async(req,res)=>{
 const posts=await Post.find({})
 var postList=[]
 const listPost = posts.sort((b, a) => a.posted - b.posted)
 listPost.forEach((post,i)=>{
     
    const timeago = timeAgo(Date.now() + (Date.now() - post.posted));
    pushPost={...post._doc,posted:timeago}
    postList.push(pushPost)
   
 })
 console.log(posts)
 res.render("feed",{posts:postList})
}

const getMyposts=async(req,res)=>{
    const posts=await Post.find({authorId:req.user._id})
    res.render("ngos/icons.ejs",{posts:posts})
}

module.exports={
    createPost,
    getAllposts,
    getMyposts

}