const  checkmodel=require("../model/check")
const fetch=async(req,res)=>{
  const Email=req.params.Email
  console.log(Email)
try{
  const  result=await checkmodel.find({Email:Email})
  console.log(result)
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
module.exports={fetch}