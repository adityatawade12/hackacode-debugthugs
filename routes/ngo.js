const express=require("express");
const { getNgos, getparticularNgo, addEvent, createNgo, addVolunteer } = require("../controllers/ngo");
const { isNGO, isLoggedin } = require("../middlewares/auth");
const router = express.Router();
const NGO =require('../models/Ngo');

router.get('/getNgos',getNgos);
router.get('/getNgos/:id',getparticularNgo);
router.post('/createEvent',isLoggedin,isNGO,createNgo);
router.post('/addEvent',isLoggedin,isNGO,addEvent);
router.post('/addVolunteer',isLoggedin,isNGO,addVolunteer);

module.exports=router;