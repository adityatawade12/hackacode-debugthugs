const mongoose=require("mongoose")
const Schema=mongoose.Schema

const chatSchema=new Schema({
    userid:{
        type:String
    },
    name:{
        type:String
    },
    text:{
        type:String
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})


module.exports=new mongoose.model("Chat",chatSchema)