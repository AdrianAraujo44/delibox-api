const admin = require("firebase-admin")
const dotenv = require("dotenv")
dotenv.config()

const uploadImages = async (req, res, next) => {
  const bucket = admin.storage().bucket()

  if (!req.files) return next()

  const keys = Object.keys(req.files)

  for (let i = 0; i < keys.length; i++) {
    const image = req.files[`${keys[i]}`][0]

    const nameImage = Date.now() + "." + image.originalname.split('.').pop()

    const fileImage = bucket.file(`${image.fieldname}/${nameImage}`)

    const stream = fileImage.createWriteStream({
      metadata: {
        contentType:image.mimetype
      }
    })

    stream.on("error", (error) => {
      console.error(error)
    })

    stream.on("finish", async () => {
      await fileImage.makePublic()
    })
    stream.end(image.buffer)
    req.body[`${keys[i]}`] = `https://storage.googleapis.com/${process.env.FIREBASE_BUCKET}/${image.fieldname}/${nameImage}`

  }
  next()
}

module.exports = uploadImages