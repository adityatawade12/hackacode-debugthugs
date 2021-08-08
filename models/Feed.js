const mongoose=require('mongoose')
const Schema=mongoose.Schema

const postSchema=new Schema({
    author:{
        type:String,
        required:true
    },
    text:{
        type:String
    },
    authorImg:{
        type:String,
        
    },
    postImg:{
        type:String
    },
    posted:{
        type:Date,
        default:Date.now()
    },
    authorId:{
        type:String
    },
    heading:{
        type:String
    }
})


module.exports=new mongoose.model("Post",postSchema)