const express=require("express")
const router = express.Router()
const{loginUser,registerUser,logoutUser,currentUser,ensureAuthenticated}=require("../controllers/userAuth")


router.post("/login",loginUser)
router.post("/register",registerUser)
router.get("/user",currentUser)
router.get("/logout",logoutUser)
router.get("/isAuth",ensureAuthenticated)

module.exports=router;