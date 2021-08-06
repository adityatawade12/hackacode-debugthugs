const NGO = require('../models/Ngo');
const NgoEvent = require('../models/Events');
const Volunteer = require('../models/Volunteers');

const getNjos=(req,res)=>{
    NGO.find({}).
    then(ngo=>{
        res.status(200).json(ngo)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}

const getparticularNgo = (req,res) => {
    NGO.find({_id:req.params.id}).
    then(ngo=>{
        res.status(200).json(ngo)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}

module.exports = {
    getNjos,
    getparticularNgo
}