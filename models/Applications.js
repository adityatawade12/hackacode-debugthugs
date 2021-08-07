const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Applications = new Schema({
    ngoId:{
        type:String,
        required:true
    },
    volunteer:{
        type:Schema.Types.ObjectId,
        ref:"Volunteer"
    },
    capacity:{
        type:String,
        default:''
    },
    motivation:{
        type:String,
        default:''
    }
});

const Application = new mongoose.model('Application',Applications);
module.exports = Application;