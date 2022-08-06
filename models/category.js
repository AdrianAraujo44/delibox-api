const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  deliveryId: {
    type: Schema.Types.ObjectId,
    ref: 'Delivery'
  }
}, { timestamps: true })

module.exports = mongoose.model('Category', CategorySchema)