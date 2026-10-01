const  express=require("express")
const connectDB=require("./config/db")
const cors=require("cors")
const app=express()
const path = require("path")
app.use(cors({
    origin:"https://projectsss-orpin.vercel.app/",
    credentials:true
}))
app.use(express.json())
const router=require("./routes/userrouter")
connectDB()
app.get("/", (req, res) => res.json({ status: "ok" }))
app.use("/api",router)
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

const PORT = process.env.PORT || 5000
// app.listen only runs for local dev / a persistent host; on Vercel this file
// is required by api/index.js and the exported app handles requests directly.
if (require.main === module) {
    app.listen(PORT,()=>{
        console.log(`Server is run on ${PORT} port`)
    })
}

module.exports = app

