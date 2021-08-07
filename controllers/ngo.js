const NGO = require('../models/Ngo');
const NgoEvent = require('../models/Events');
const Volunteer = require('../models/Volunteers');

const getNgos=(req,res)=>{
    NGO.find({}).
    then(ngo=>{
        res.render("ngos/ngo",{ ngos : ngo });
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

const createNgo = (req,res) => {
    const newNgo = new NGO({...req.body,userId:req.userId});
    console.log(newNgo);
    newNgo.save().then(ngo=>{
        res.status(200).json(ngo);
    }).catch(err=>{
        res.status(500).json(err);
    })
}

const addEvent = (req,res) => {
    const newEvent = new NgoEvent({...req.body});
    const eventId = newEvent._id;
    newEvent.save();
    NGO.findOneAndUpdate({userId:req.userId},
        {$push : {events: eventId}},
        {new: true},)
        .then(ngo => {
            res.status(200).json(ngo);
        }).catch(err=>{
            res.status(500).json(err);
        })
}

const addVolunteer = (req,res) => {
    const newVolunteer = new Volunteer({...req.body});
    const volunteerId = newVolunteer._id;
    newVolunteer.save();
    NGO.findOneAndUpdate({userId:req.userId},
        {$push : {volunteers:volunteerId}},
        {new: true},)
        .then(ngo => {
            res.status(200).json(ngo);
        }).catch(err=>{
            res.status(500).json(err);
        }) 
}

module.exports = {
    getNgos,
    getparticularNgo,
    addEvent,
    createNgo,
    addVolunteer
}