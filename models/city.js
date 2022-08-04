const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  neighborhoods: []
}, { timestamps: true })

module.exports = mongoose.model('City', citySchema)