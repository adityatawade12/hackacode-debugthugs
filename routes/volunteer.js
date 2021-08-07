const express=require("express");
const { addVolunteer, submitApplication } = require("../controllers/volunteer");
const { isLoggedin, isVolunteer } = require("../middlewares/auth");
const router = express.Router();

router.post('/registerVolunteer',isLoggedin,isVolunteer,addVolunteer);
router.post('/submitApplication',isLoggedin,isVolunteer,submitApplication);

module.exports=router;