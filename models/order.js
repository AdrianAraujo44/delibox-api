const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  deliveryId: { type: Schema.Types.ObjectId, ref: 'Delivery' },
  type: { type: String, required: true },
  code: { type: String, required: true },
  status: [
    {
      name: { type: String, required: true },
      date: { type: Date, required: true }
    }
  ],
  tax: { type: Number, default: 0 },
  new: { type: Boolean, default: true, default: true },
  date: { type: Date, required: true },
  notes: { type: String, default: "" },

  money: {
    type: { type: String, default: '' },
    change: { type: Number, default: 0 },
  },

  client: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: {
      street: { type: String, },
      number: { type: String, },
      complement: { type: String, },
      cep: { type: String, },
      neighborhood: { type: String, },
    }
  },

  products: [{
    amount: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    complements: [{
      name: { type: String, required: true },
      price: { type: Number, required: true},
      amount: {type:Number, rquired: true}
    }]
  }]

}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)
