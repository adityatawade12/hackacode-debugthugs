const express=require("express");
const { getNgos, getparticularNgo, addEvent, createNgo, addVolunteer, editNgo, getNgoEvents, renderEventPage, renderCreateEventPage, renderEditEventPage } = require("../controllers/ngo");
const { isNGO, isLoggedin } = require("../middlewares/auth");
const router = express.Router();
const NGO =require('../models/Ngo');
const {upload, uploadCoverImage, uploadEventImage}=require("../middlewares/multer")

var cpUpload = upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'profile', maxCount: 1 }])
router.get('/',getNgos);

router.post('/createNGO',isLoggedin,isNGO,cpUpload,createNgo);
router.post('/events/addEvent',isLoggedin,isNGO,addEvent);
router.post('/addVolunteer',isLoggedin,isNGO,addVolunteer);
router.put('/editNgoProfile',isLoggedin,isNGO,cpUpload,editNgo);
router.get('/events',isLoggedin,isNGO,getNgoEvents);
router.get("/events/new",renderCreateEventPage)
router.get("/events/edit",renderEditEventPage)
router.get('/:slug',getparticularNgo);

module.exports=router;
