const express = require("express");
const { addVolunteer, submitApplication } = require("../controllers/volunteer");
const { isLoggedin, isVolunteer } = require("../middlewares/auth");
const router = express.Router();

router.get('/add-info', (req, res) => {
    res.render("ngos/additionalinfo");
})
router.get('/profile', isLoggedin, isVolunteer, (req, res) => {
    res.render("volunteers/profile");
})
router.get('/apply/:slug',isLoggedin,isVolunteer,(req,res)=>{
    res.render("ngos/applyngo",{ slug:req.params.slug });
})
router.post('/registerVolunteer', isLoggedin, isVolunteer, addVolunteer);
router.post('/submitApplication/:slug', isLoggedin, isVolunteer, submitApplication);

module.exports = router;