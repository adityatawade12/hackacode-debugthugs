const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    profilePic:{
        type:String,
        default:''
    }
})

const User = new mongoose.model("User",UserSchema);
module.exports = User;
