const mongoose = require('mongoose');
const path = require('path')
require('dotenv').config({path:path.join(__dirname,'../.env')}); // absolute path needed idk why



// function to connect database


function connect_database(){
    mongoose.connect(process.env.MONGO_URL)
    const connection = mongoose.connection;
    connection.once('open',()=>{
        console.log('Database connected')
    }).on('error',function(err){
        console.log(err);
    })
}


module.exports = connect_database;
