const Stripe=require("Stripe")
const stripe=new Stripe(process.env.Secret_key)
module.exports=stripe