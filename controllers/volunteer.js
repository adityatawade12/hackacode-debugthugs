const NGO = require('../models/Ngo');
const NgoEvent = require('../models/Events');
const Volunteer = require('../models/Volunteers');
const Applications = require("../models/Applications");
const User = require('../models/User');

// ...req.body,userId:req.user._id

const addVolunteer = async (req, res) => {
    console.log(req.user._id)
    User.findById({ _id: req.user._id }).then(user => {
        console.log(user);
        console.log(req.body);
        const newVolunteer = new Volunteer({
            name: user.name,
            email: user.email,
            phone: req.body.phone,
            bio: req.body.bio,
            address: req.body.address
        });
        //const volunteerId = newVolunteer._id;
        newVolunteer.save().
            then(vol => {
                // res.status(200).json(vol);
                res.redirect('/NGO')
            }).catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    }).catch(err => {
        console.log(err);
    })


}

const FindVolunteer = async (req, res) => {
    console.log(req.user._id)
    Volunteer.findById({ _id: req.user._id }).then(volunteer => {
        console.log(volunteer);
        console.log(req.body);
        res.render('volunteers/profile', { volunteer: volunteer })
    }).catch(err => {
        console.log(err);
    })
}

const submitApplication = (req, res) => {
    console.log(req.params);
    NGO.findOne({ slug: req.params.slug }).
        then(ngo => {
            console.log(ngo)
            Volunteer.findOne({ email: req.user.email }).
                then(vol => {
                    console.log(vol);
                    const newApp = new Applications({ ...req.body, ngoId: ngo._id, volunteer: vol._id });
                    console.log(newApp);
                    newApp.save().
                        then(app => {
                            res.status(200).json(app);
                        }).catch(err => {
                            res.status(500).json(err)
                        })
                }).catch(err => {
                    console.log(err);
                })
        }).catch(err => {
            console.log(err);
        })

}

const renderNgo = (req,res) =>{
    res.render('ngos/ngo',{user:req.user})
}

module.exports = {
    addVolunteer,
    submitApplication,
    FindVolunteer,
    renderNgo
}

// NGO.findOneAndUpdate({userId:req.userId},
    //     {$push : {volunteers:volunteerId}},
    //     {new: true},)
    //     .then(ngo => {
    //         res.status(200).json(ngo);
    //     }).catch(err=>{
    //         res.status(500).json(err);
    //     }) 