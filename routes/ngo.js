const express=require("express");
const { getNgos, getparticularNgo, addEvent, createNgo, editNgo, getNgoEvents,getNgoVolunteer, renderEventPage, renderCreateEventPage, renderEditEventPage, addImage, removeImage, updateEvent, deleteEvent, getMyposts, createPostRender,getNgo, getVolunteer, acceptVolunteer, deleteVolunteer, renderChat } = require("../controllers/ngo");
const { isNGO, isLoggedin } = require("../middlewares/auth");
const router = express.Router();
const NGO = require('../models/Ngo');
const { upload, uploadCoverImage, uploadEventImage } = require("../middlewares/multer")
const { search } = require('../controllers/search')
var cpUpload = upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'profile', maxCount: 1 }])

router.get('/',getNgos);

router.get("/chat",renderChat)
router.get('/user',isLoggedin,isNGO,getNgo);
router.post('/createNGO',isLoggedin,isNGO,cpUpload,createNgo);
router.post('/events/addEvent',isLoggedin,isNGO,addEvent);
router.put('/editNgoProfile',isLoggedin,isNGO,cpUpload,editNgo);
router.get('/events',isLoggedin,isNGO,getNgoEvents);
router.get("/events/new",renderCreateEventPage)
router.get("/events/edit",renderEditEventPage)
router.get("/events/:id/edit",renderEditEventPage)
router.post("/events/:id/edit",updateEvent)
router.put("/addImage",isLoggedin,isNGO,upload.single("image"),addImage)
router.get("/myPosts",isLoggedin,getMyposts)
router.get("/myPosts/new",createPostRender)
router.post("/removeImage",upload.single("image"),removeImage)
router.delete("/events/:id",isLoggedin,isNGO,deleteEvent)
router.get("/volunteers",isLoggedin,isNGO,getNgoVolunteer);
router.get("/volunteers/:id",isLoggedin,isNGO,getVolunteer);
router.get("/volunteers/:id/accept",isLoggedin,isNGO,acceptVolunteer);
router.get("/volunteers/:id/delete",isLoggedin,isNGO,deleteVolunteer);
router.get('/:slug',getparticularNgo);


module.exports=router;
