const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const admin = require("firebase-admin")
const { Server } = require("socket.io")

const deliveryRouter = require('./routers/delivery')
const credentialRouter = require('./routers/credential')
const cityRouter = require('./routers/city')
const categoryRouter = require('./routers/category')
const productRouter = require('./routers/product')
const orderRouter = require('./routers/order')

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
app.use('/api/v1/order', orderRouter)

const http = require('http')
const { orderController } = require('./controllers/order')
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
})

io.on('connection', (socket) => {
  console.log(`user connect ${socket.id}`)

  socket.on("join_room", (data) => {
    socket.join(data)
    console.log(`user with id ${socket.id} join room ${data} `)
  })

  socket.on("orders", async(deliveryId) => {
    const orders = await orderController.getAll(deliveryId)
    io.to(deliveryId).emit("recive_orders", orders)
  })

  socket.on("new_orders", async(order) => {
    await orderController.newOrder(order)
    const orders = await orderController.getAll(order.deliveryId)
    io.to(order.deliveryId).emit("update_orders", orders)
  })

  socket.on("update_status_order", async(data) => {
    await orderController.update(data.orderId, data.status)
    const orders = await orderController.getAll(data.deliveryId)
    io.to(data.deliveryId).emit("update_orders", orders)
  }) 

  socket.on("update_new_order", async(data) => {
    await orderController.updateNew(data.orderId)
    const orders = await orderController.getAll(data.deliveryId)
    io.to(data.deliveryId).emit("update_orders", orders)
  }) 

  socket.on("disconnect", () => {
    console.log(`user disconneted ${socket.id}`)
  })

})

server.listen(process.env.PORT || 3000, () => {
  console.log(`Backend is running in ${process.env.PORT || 3000}`)
})