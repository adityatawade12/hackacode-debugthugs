const express=require("express");
const router=express.Router()
const {createPost, getAllposts, getMyposts}=require("../controllers/feed");
const { isLoggedin } = require("../middlewares/auth");
const {upload, uploadCoverImage, uploadEventImage}=require("../middlewares/multer")

router.get("/",getAllposts)
router.post("/createPost",isLoggedin,upload.single("image"),createPost)

router.get("/myPosts",isLoggedin,getMyposts)



module.exports=router