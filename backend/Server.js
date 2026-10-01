const  express=require("express")
const connectDB=require("./config/db")
const cors=require("cors")
const app=express()
const path = require("path")
app.use(cors())
app.use(express.json())
const router=require("./routes/userrouter")
connectDB()
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server is run on ${PORT} port`)
})
app.use("/api",router)
app.use("/uploads", express.static(path.join(__dirname, "uploads")))


