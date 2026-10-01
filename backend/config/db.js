const mongoose = require('mongoose')
 const dotenv=require("dotenv")
dotenv.config()

// Serverless functions can stay warm between requests, so avoid opening a
// new connection (and exhausting Mongo's connection limit) on every call.
let isConnected = false

const ConnectDB=async ()=>{
    if(isConnected || mongoose.connection.readyState === 1) return
    try{
       await mongoose.connect(process.env.MONGODB_URL)
       isConnected = true
       console.log("database connect")
    }catch(err){
        console.log(err)
    }
}
module.exports=ConnectDB
