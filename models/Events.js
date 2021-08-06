const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    eventInfo:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        default:''
    },
    endDate:{
        type:Date,
        default:''
    },
    eventImage:[
        {
            type:String,
            default:''
        }
    ],
    logo:{
        type:String,
        default:''
    }
});

const NgoEvent = new mongoose.model('NgoEvent',EventSchema);
module.exports = NgoEvent;