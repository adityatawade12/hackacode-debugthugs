const express=require("express");
const { getNgos, getparticularNgo, addEvent, createNgo } = require("../controllers/ngo");
const { isNGO, isLoggedin } = require("../middlewares/auth");
const router = express.Router();
const NGO =require('../models/Ngo');
const {upload, uploadCoverImage, uploadEventImage}=require("../middlewares/multer")

var cpUpload = upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'profile', maxCount: 1 }])
router.get('/getNgos',getNgos);
router.get('/getNgos/:slug',getparticularNgo);
router.post('/createNGO',isLoggedin,isNGO,cpUpload,createNgo);
router.post('/addEvent',isLoggedin,isNGO,addEvent);


module.exports=router;