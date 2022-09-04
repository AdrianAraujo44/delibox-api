const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema ({
  deliveryId: {type: Schema.Types.ObjectId, ref: 'Delivery'},
  code: { type: String, required: true },
  status: [
    {
      name: {type: String,  required: true},
      date: {type: Date, required: true}
    }
  ],
  new: { type: Boolean, default: true, default: true },
  date: { type: Date, required: true },
  notes: { type: String, default: "" },

  money: {
    type: { type: String, required: true },
    change: { type: Number, required: true },
  },

  client: {
    name: { type: String, required: true},
    phone: { type: String, required: true},
    address: { 
      street: { type: String,},
      number: { type: String,},
      complement: { type: String, default: ""},
      cep: { type: String,},
      neighborhood: { type: String,},
    }
  },

  products: [{
    amount: { type: Number, required: true},
    item: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    }
  }]

}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)
