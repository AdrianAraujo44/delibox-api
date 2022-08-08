const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const admin = require("firebase-admin")

const deliveryRouter = require('./routers/delivery')
const credentialRouter = require('./routers/credential')
const cityRouter = require('./routers/city')
const categoryRouter = require('./routers/category')
const productRouter = require('./routers/product')

const app = express()
dotenv.config()

const serviceAccount = {
  type: `${process.env.TYPE}`,
  project_id: `${process.env.PROJECT_ID}`,
  private_key_id: `${process.env.PRIVATE_KEY_ID}`,
  private_key: process.env.PRIVATE_KEY,
  client_email: `${process.env.CLIENT_EMAIL}`,
  client_id: `${process.env.CLIENTE_ID}`,
  auth_uri: `${process.env.AUTH_URI}`,
  token_uri: `${process.env.TOKEN_URI}`,
  auth_provider_x509_cert_url: `${process.env.AUTH_PROVIDER_X509_CERT_URL}`,
  client_x509_cert_url: `${process.env.CLIENT_X509_CERT_URL}`
}

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