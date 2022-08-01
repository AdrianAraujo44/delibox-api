const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log(err)
  })