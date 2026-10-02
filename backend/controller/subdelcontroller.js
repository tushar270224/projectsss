const stuuudata=require("../model/Never2")
const  subdel=async(req,res)=>{
    try{
       const id=req.params.id
       const result =await stuuudata.deleteOne({_id:id})
       if(result){
        res.send({statuscode:1,data:result})
       }else{
        res.send({statuscode:0})
       }
    }catch(err){
        console.log(err)
        res.status(500).send({statuscode:0,mssg:"server error"})
    }
}
module.exports={subdel}
