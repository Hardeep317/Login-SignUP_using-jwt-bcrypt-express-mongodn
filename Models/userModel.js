const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:String
})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;