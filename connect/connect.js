const mongoose = require('mongoose');

function connect(){
    return new Promise((res,rej) => {
        mongoose.connect('mongodb://127.0.0.1:27017/test', (err) => {
            if(err){
                return rej(err);
            }
        })
        res(() => {
            console.log("connected successfully");
        })
    })
}

module.exports = connect