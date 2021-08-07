const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const imageSchema=new Schema({
    name:{
        type:String
    },
    link:{
        type:String
    }
})

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
            type:imageSchema,
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