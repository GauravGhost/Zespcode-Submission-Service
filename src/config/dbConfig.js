const mongoose = require('mongoose');
const { MONGODB_URL } = require('./serverConfig');

async function connectToDB(){
    try{
        console.log(MONGODB_URL)
        await mongoose.connect(MONGODB_URL);
    } catch (err){
        console.log(err);
    }
}


module.exports = {connectToDB};