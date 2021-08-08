const NGO = require('../models/Ngo');
const NgoEvent = require('../models/Events');
const Volunteer = require('../models/Volunteers');
const Applications = require("../models/Applications");
const Application = require('../models/Applications');

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
   NGO.findByIdAndUpdate(req.ngoId,updateObj,{new:true})
   .then((ngo)=>{
       console.log(ngo.slug);
       res.redirect('/dashboard');
   })
    .catch(err=>{res.send(err)})
}

const addEvent = async(req,res) => {
    const ngo=await NGO.findOne({_id:req.ngoId})
    const img=ngo.logo
    const newEvent = new NgoEvent({...req.body,logo:img});
    const eventId = newEvent._id;
    await newEvent.save();
    NGO.findOneAndUpdate({userId:req.userId},
        {$push : {events: eventId}},
        {new: true},)
        .then(ngo => {
            res.redirect("/NGO/events")
            // res.status(200).json(ngo);
        }).catch(err=>{
            res.status(500).json(err);
        })
}

const getNgoEvents = (req,res) =>{
    NGO.findOne({userId:req.userId}).populate('events')
    .then(data=>{
        const e=data.events
        var eventC=[]
        var eventP=[]
        e.forEach(element => {
            if(element.endDate<Date.now()){
                eventP.push(element)
            }else{
                eventC.push(element)
            }
        });
        res.render("ngos/events",{eventsC:eventC,eventsP:eventP})
    }).catch(err=>{
        res.status(500).json(err);
    });
}

const getNgoVolunteer = (req,res) =>{
    console.log(req.ngoId);
    // Applications.find({ngoId : req.ngoId}).
    // then(apps=>{
    //     console.log(apps);
    //     res.render('ngos/typography.ejs',{ apps : apps });
    // }).catch(err=>{
    //     console.log(err);
    // })
    NGO.findOne({_id:req.ngoId}).populate('volunteers').
    then(ngo=>{
        console.log(ngo);
        Applications.find({ngoId : req.ngoId}).populate('volunteer')
        .then(apps=>{
                console.log(apps);
                res.render('ngos/typography.ejs',{ apps : apps , ngo : ngo });
            }).catch(err=>{
                console.log(err);
            })
    }).catch(err=>{
        console.log(err);
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

const renderEventPage= (req, res) => {
    console.log("here")
    res.render('ngos/events')
}

const renderEditEventPage= (req, res) => {
    res.render('ngos/editEvent.ejs')
}

const renderCreateEventPage=(req,res)=>{
    res.render('ngos/createEvent.ejs')
}

const renderViewEventPage=(req,res)=>{
    res.render('ngos/viewEvent.ejs')
}

const getNgo = (req,res) =>{
    NGO.findOne({userId:req.user._id}).
    then(ngo=>{
        console.log(ngo);
        res.render('ngos/user.ejs', { user : req.user,myNgo : ngo });
    }).catch(err=>{
        console.log(err);
    })
}

const getVolunteer = (req,res) =>{
    console.log(req.params.id);
    Volunteer.findOne({_id:req.params.id}).
    then(volunteer=>{
        console.log(volunteer);
        res.render('volunteers/profile',{ volunteer:volunteer });
    }).catch(err=>{
        console.log(err);
    })
}

const acceptVolunteer = (req,res) =>{
    Volunteer.findOne({_id:req.params.id}).
    then(vol=>{
        NGO.findOneAndUpdate({_id:req.ngoId},{$push : {volunteers : vol._id}},{new:true}).
        then(ngo=>{
            console.log(ngo);
            Application.findOneAndDelete({ngoId : req.ngoId}).
            then(app=>{
                console.log(app);
                res.redirect('/ngo/user');
            }).catch(err=>{
                console.log(err);
            })
            //res.status(200).json(ngo);
            //res.render('ngos/user');
        }).catch(err=>{ 
            console.log(err);
        })
    }).catch(err=>{
        console.log(err);
    })
}

const deleteVolunteer = (req,res) => {
    Volunteer.findOne({_id:req.params.id}).
    then(vol=>{
        NGO.findOneAndUpdate({_id:req.ngoId},{$pull : {volunteers : vol._id}},{new:true}).
        then(ngo=>{
            console.log(ngo);
            Application.findOneAndDelete({ngoId : req.ngoId}).
            then(app=>{
                console.log(app);
                res.redirect('/ngo/user');
            }).catch(err=>{
                console.log(err);
            })
            //res.status(200).json(ngo);
        }).catch(err=>{ 
            console.log(err);
        })
    }).catch(err=>{
        console.log(err);
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
    getNgoVolunteer,
    renderEventPage,
    renderCreateEventPage,
    renderEditEventPage,
    getNgo,
    getVolunteer,
    acceptVolunteer,
    deleteVolunteer
}