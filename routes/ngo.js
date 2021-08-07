const express = require("express");
const { getNgos, getparticularNgo } = require("../controllers/ngo");
const router = express.Router();
const NGO = require('../models/Ngo');

router.get('/getNgos', getNgos);
router.get('/getNgos/:id', getparticularNgo);

module.exports = router;