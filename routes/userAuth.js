const express=require("express")
const router = express.Router()
const{loginUser,registerUser,logoutUser,currentUser,ensureAuthenticated, doc}=require("../controllers/userAuth")
const{isLoggedin, isNGO, isUser, isVolunteer}=require("../middlewares/auth")

router.post("/login",loginUser)
router.post("/register",registerUser)
router.get("/user",isLoggedin,currentUser)
router.get("/logout",logoutUser)
router.get("/isAuth",ensureAuthenticated)
router.get("/doc",doc)

module.exports=router;