const mongoose = require('mongoose')
const Schema = mongoose.Schema

const complementSchema = new Schema ({
  title: {
    type: String,
    required: true
  },
  deliveryId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Delivery' 
  },
  rules: {
    mandatory: {
      type: Boolean,
      required: true
    },
    maxItens: {
      type: Number,
      required: true
    },
    maxChoiceItem: {
      type: Number,
      required: true
    }
  },
  itens: [
    {
      name: String,
      price: Number
    },
    {required: true}
  ]
})

module.exports = mongoose.model('Complement', complementSchema)