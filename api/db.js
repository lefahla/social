const mongoose = require('mongoose');
const dotenv = require("dotenv").config();

mongoose.connect(process.env.MONGO_URL,(err) => {
    if(err){
        console.log("Error in DB Connection : "+JSON.stringify(err, undefined, 2));
   
        }else{
            console.log("Successfully connected to IBA Database");
     } 
}); 

module.exports = mongoose; 