const mongoose = require('mongoose')
 const dotenv=require("dotenv")
dotenv.config()

// Shared/free-tier Atlas clusters (M0) can take much longer than mongoose's
// 10s default to accept a fresh connection on a cold start, so give queued
// operations more room before giving up instead of failing right at 10s.
mongoose.set('bufferTimeoutMS', 25000)

// Serverless functions can stay warm between requests, so avoid opening a
// new connection (and exhausting Mongo's connection limit) on every call.
let isConnected = false

const ConnectDB=async ()=>{
    if(isConnected || mongoose.connection.readyState === 1) return
    await mongoose.connect(process.env.MONGODB_URL)
    isConnected = true
    console.log("database connect")
}
module.exports=ConnectDB
