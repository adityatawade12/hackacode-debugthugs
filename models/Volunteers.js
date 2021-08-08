const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VolunteerSchema = new Schema({
    name:{
        type:String,
        default:''
    },
    bio:{
        type:String,
        default:''
    },
    address:{
        type:String,
        default:''
    },
    phone:{
        type:Number,
        default:''
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