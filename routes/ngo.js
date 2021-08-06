const express=require("express");
const { getNjos, getparticularNgo } = require("../controllers/ngo");
const router = express.Router()

router.get('/getNgos',getNjos);
router.get('/getNgos/:id',getparticularNgo);

module.exports=router;