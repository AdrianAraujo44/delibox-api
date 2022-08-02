const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const deliveryRouter = require('./routers/delivery')
const credentialRouter = require('./routers/credential')

const app = express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

require("./config/connection")

app.use('/api/v1/delivery', deliveryRouter)
app.use('/api/v1/credential', credentialRouter)

app.listen(process.env.PORT || 3000, () => {
  console.log(`Backend is running in ${process.env.PORT || 3000}`)
})