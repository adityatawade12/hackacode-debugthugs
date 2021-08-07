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
    NGO.findOne({slug:req.params.slug}).
    then(ngo=>{
        res.status(200).json(ngo)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}

const createNgo = (req,res) => {
    console.log(req.body)
    const coverImg=req.files.cover[0].fileId
    const profileImg=req.files.profile[0].fileId
    const newNgo = new NGO({...req.body,userId:req.userId,owner:req.user.name,coverImage: 'https://drive.google.com/thumbnail?id='+coverImg,logo: 'https://drive.google.com/thumbnail?id='+profileImg});
    console.log(newNgo);
    newNgo.save().then(ngo=>{
        res.status(200).json(ngo);
    }).catch(err=>{
        res.status(500).json(err);
    })
}

const addEvent = (req,res) => {
    console.log(req.body);
    const newEvent = new NgoEvent({...req.body.data});
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




module.exports = {
    getNgos,
    getparticularNgo,
    addEvent,
    createNgo
}