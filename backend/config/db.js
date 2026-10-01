const mongoose = require('mongoose')
 const dotenv=require("dotenv")
dotenv.config()
const ConnectDB=()=>{
    try{
       mongoose.connect(process.env.MONGODB_URL)
       console.log("database connect")
    }catch(err){
        console.log(err)
    }
}
module.exports=ConnectDB
