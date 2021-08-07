const NGO = require('../models/Ngo');
const NgoEvent = require('../models/Events');
const Volunteer = require('../models/Volunteers');
const Applications = require("../models/Applications");

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
        res.render("ngos/show",{ ngo : ngo })
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}

const createNgo = (req,res) => {
    console.log(req.body)
    let updateObj
    if(req.files.cover!=undefined &&req.files.profile!=undefined){
        const coverImg=req.files.cover[0].fileId
        const profileImg=req.files.profile[0].fileId
        updateObj={...req.body,coverImage: 'https://drive.google.com/thumbnail?id='+coverImg,logo: 'https://drive.google.com/thumbnail?id='+profileImg}
    }else if(req.files.cover==undefined &&req.files.profile!=undefined){
        
        const profileImg=req.files.profile[0].fileId
        updateObj={...req.body,logo: 'https://drive.google.com/thumbnail?id='+profileImg}
    }else if(req.files.cover!=undefined &&req.files.profile==undefined){
        const coverImg=req.files.cover[0].fileId
      
        updateObj={...req.body,coverImage: 'https://drive.google.com/thumbnail?id='+coverImg}
    }else{
        updateObj={...req.body}
    }
    const newNgo = new NGO({...updateObj});
    console.log(newNgo);
    newNgo.save().then(ngo=>{
        res.status(200).json(ngo);
    }).catch(err=>{
        res.status(500).json(err);
    })
}

const editNgo = async(req,res) => {
    console.log(req.body)
    let updateObj
    if(req.files.cover!=undefined &&req.files.profile!=undefined){
        const coverImg=req.files.cover[0].fileId
        const profileImg=req.files.profile[0].fileId
        updateObj={...req.body,coverImage: 'https://drive.google.com/thumbnail?id='+coverImg,logo: 'https://drive.google.com/thumbnail?id='+profileImg}
    }else if(req.files.cover==undefined &&req.files.profile!=undefined){
        
        const profileImg=req.files.profile[0].fileId
        updateObj={...req.body,logo: 'https://drive.google.com/thumbnail?id='+profileImg}
    }else if(req.files.cover!=undefined &&req.files.profile==undefined){
        const coverImg=req.files.cover[0].fileId
      
        updateObj={...req.body,coverImage: 'https://drive.google.com/thumbnail?id='+coverImg}
    }else{
        updateObj={...req.body}
    }
   
    console.log(updateObj,req.ngoId)
   NGO.findOneAndUpdate({_id:req.ngoId},updateObj,{new:true})
   .then((ngo)=>{
       res.send(ngo)
   })
    .catch(err=>{res.send(err)})
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

const getNgoEvents = (req,res) =>{
    NGO.findOne({userId:req.userId}).populate('events')
    .then(events=>{
        res.status(200).json(events);
    }).catch(err=>{
        res.status(500).json(err);
    });
}

const getNgoVolunteer = (req,res) =>{
    NGO.findOne({userId:req.userId}).populate('volunteers')
    .then(vol => {
        res.status(200).json(vol);
    }).catch(err=>{
        res.status(500).json(err);
    })
}

const updateVolunteer = (req,res) => {
    Volunteer.findOneAndUpdate({_id:req.body.voluteerId},req.body,{new:true})
    .then(volunteer => {
        res.status(200).json(volunteer);
    }).catch(err=>{
        res.status(500).json(err);
    })
}

module.exports = {
    getNgos,
    getparticularNgo,
    addEvent,
    createNgo,
    updateVolunteer,
    editNgo,
    getNgoEvents,
    getNgoVolunteer
}