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

const renderEditEventPage= async(req, res) => {
    const data1=await NgoEvent.findOne({_id:req.params.id})
    var data={...data1}
    st=data1.startDate.toISOString().slice(0,10)
    data.startDate=data1.startDate.toISOString().slice(0,10)
    data.endDate=data1.endDate.toISOString().slice(0,10)
    console.log(data)
    res.render('ngos/editEvent.ejs',{data:data1})
}

const updateEvent=(req,res)=>{
    console.log("------------------------------------------------")
    console.log(req.body)
    NgoEvent.findOneAndUpdate({_id:req.params.id},{...req.body})
    .then(event=>{
        res.redirect("/NGO/events/"+req.params.id+"/edit")
    }).catch(err=>{
        res.redirect("/NGO/events")
    })
}

const renderCreateEventPage=(req,res)=>{
    
    res.render('ngos/createEvent.ejs')
}

const addImage=async(req,res)=>{
    console.log(req.file,req.body)
    imgObj={
        name:req.file.originalname,
        link:'https://drive.google.com/thumbnail?id='+req.file.fileId
    }
    NgoEvent.findOneAndUpdate({_id:req.body.id},{$push : {eventImage: imgObj}},{new:true})
    .then(event=>{
        res.send(event)
    })
    .catch(err=>{res.send(err)})

}
const removeImage=(req,res)=>{
    console.log(req.body.link,"sahdsajk")
    // console.log(JSON.parse(req.body))
    NgoEvent.findOneAndUpdate({_id:req.body.id},
        {$pull : {eventImage: {link:req.body.link}}},
        {new: true})
        .then(ngo => {
            res.status(200).json(ngo);
        }).catch(err=>{
            console.log("err",err)
            res.status(500).json(err);
        }) 
}

module.exports = {
    getNgos,
    getparticularNgo,
    addEvent,
    createNgo,
    addVolunteer,
    updateVolunteer,
    editNgo,
    getNgoEvents,
    renderEventPage,
    renderCreateEventPage,
    renderEditEventPage,
    addImage,
    removeImage,
    updateEvent
}