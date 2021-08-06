const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VolunteerSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        required:true
    },
    address:{
        type:String,
        default:''
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:''
    }
});

const Volunteer = new mongoose.model('Volunteer',VolunteerSchema);
module.exports = Volunteer;