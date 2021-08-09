const mongoose=require("mongoose")
const Schema=mongoose.Schema

const chatSchema=new Schema({
   
    name:{
        type:String
    },
    text:{
        type:String
    },
    timestamp:{
        type:Date,
        default:Date.now
    },
    room:{
        type:String
    }
})


module.exports=new mongoose.model("Chat",chatSchema)