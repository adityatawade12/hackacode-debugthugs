const express = require("express");
const { addVolunteer, submitApplication } = require("../controllers/volunteer");
const { isLoggedin, isVolunteer } = require("../middlewares/auth");
const router = express.Router();

router.get('/add-info', (req, res) => {
    res.render("ngos/additionalinfo");
})
router.get('/profile', isLoggedin, (req, res) => {
    res.render("volunteers/profile");
})
router.post('/registerVolunteer', isLoggedin, isVolunteer, addVolunteer);
router.post('/submitApplication', isLoggedin, isVolunteer, submitApplication);

module.exports = router;