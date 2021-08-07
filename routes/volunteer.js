const express = require("express");
const { addVolunteer, submitApplication, FindVolunteer } = require("../controllers/volunteer");
const { isLoggedin, isVolunteer } = require("../middlewares/auth");
const router = express.Router();

router.get('/add-info', (req, res) => {
    res.render("ngos/additionalinfo");
})

router.post('/registerVolunteer', isLoggedin, isVolunteer, addVolunteer);
router.get('/profile', isLoggedin, isVolunteer, FindVolunteer)
router.post('/submitApplication', isLoggedin, isVolunteer, submitApplication);

module.exports = router;