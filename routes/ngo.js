const express=require("express");
const { getNgos, getparticularNgo, addEvent, createNgo, addVolunteer, editNgo, getNgoEvents, getNgoVolunteer, submitApplication } = require("../controllers/ngo");
const { isNGO, isLoggedin } = require("../middlewares/auth");
const router = express.Router();
const NGO =require('../models/Ngo');
const {upload, uploadCoverImage, uploadEventImage}=require("../middlewares/multer")

var cpUpload = upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'profile', maxCount: 1 }])
router.get('/',getNgos);
router.get('/:slug',getparticularNgo);
router.post('/createNGO',isLoggedin,isNGO,cpUpload,createNgo);
router.post('/addEvent',isLoggedin,isNGO,addEvent);
router.put('/editNgoProfile',isLoggedin,isNGO,cpUpload,editNgo);
router.get('/getNgoEvents',isLoggedin,isNGO,getNgoEvents);
router.get('/getNgoVolunteers',isLoggedin,isNGO,getNgoVolunteer);


module.exports=router;
