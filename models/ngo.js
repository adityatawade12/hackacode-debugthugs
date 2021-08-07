const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NgoSchema = new Schema({
    NgoName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    owner:{
        type:String,
        default:''
    },
    events:[
        {
            type:Schema.Types.ObjectId,
            ref:'NgoEvent'
        }
    ],
    volunteers:[
        {
            type:Schema.Types.ObjectId,
            ref:'Volunteer'
        }
    ],
    userId:{
        type:String,
        required:true
    }
});

const NGO = new mongoose.model("NGO",NgoSchema);
module.exports = NGO;