const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: true
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }],
  imageUrl: {
    type: String,
    default: ''
  }
}, { timestamps: true })

module.exports = mongoose.model('Product', ProductSchema)