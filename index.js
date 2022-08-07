const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const admin = require("firebase-admin")
const serviceAccount = require("./config/firebase-key.json")

const deliveryRouter = require('./routers/delivery')
const credentialRouter = require('./routers/credential')
const cityRouter = require('./routers/city')
const categoryRouter = require('./routers/category')
const productRouter = require('./routers/product')

const app = express()
dotenv.config()

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_BUCKET
});

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

require("./config/connection")

app.use('/api/v1/delivery', deliveryRouter)
app.use('/api/v1/credential', credentialRouter)
app.use('/api/v1/city', cityRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/product', productRouter)

app.listen(process.env.PORT || 3000, () => {
  console.log(`Backend is running in ${process.env.PORT || 3000}`)
})