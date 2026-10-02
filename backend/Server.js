const  express=require("express")
const connectDB=require("./config/db")
const cors=require("cors")
const app=express()
const path = require("path")
// Vercel issues a fresh preview URL (a random hash) on every deploy of the
// frontend project, so matching one exact URL breaks on the next deploy.
// This matches the whole family: the stable production domain and every
// preview build, plus localhost for local dev.
const allowedOriginPattern = /^https:\/\/projectsss(-[a-z0-9]+)?(-tushar-27f5)?\.vercel\.app$/i
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOriginPattern.test(origin) || /^http:\/\/localhost(:\d+)?$/.test(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials:true
}))
app.use(express.json())
const router=require("./routes/userrouter")
connectDB().catch((err) => console.log(err))
app.get("/", (req, res) => res.json({ status: "ok" }))
app.use("/api", async (req, res, next) => {
    try {
        await connectDB()
        next()
    } catch (err) {
        console.log(err)
        res.status(503).send({ statuscode: 0, mssg: "database unavailable, please try again" })
    }
})
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

