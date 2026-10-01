const fs = require("fs")
const path = require("path")

// multer keeps the file in memory (req.file.buffer); this middleware persists
// it to Vercel Blob when a token is configured, otherwise falls back to the
// local uploads/ folder for local development. Either way it sets
// req.file.filename to what controllers should store in the DB (a full URL
// for Blob, a bare filename for local disk).
const uploadToBlob = async (req, res, next) => {
    if (!req.file) return next()
    try {
        if (process.env.BLOB_READ_WRITE_TOKEN) {
            const { put } = require("@vercel/blob")
            const blob = await put(req.file.originalname, req.file.buffer, {
                access: "public",
                addRandomSuffix: true,
                token: process.env.BLOB_READ_WRITE_TOKEN,
            })
            req.file.filename = blob.url
        } else {
            const uploadsDir = path.join(__dirname, "..", "uploads")
            if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
            fs.writeFileSync(path.join(uploadsDir, req.file.originalname), req.file.buffer)
            req.file.filename = req.file.originalname
        }
        next()
    } catch (err) {
        console.log(err)
        res.status(500).send({ statuscode: 0, mssg: "file upload failed" })
    }
}

module.exports = uploadToBlob
