const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaxSchema = new Schema ({
  city: {
    name: {
      type: String,
      required: true
    },
    neighborhoods: [
      {
        name: {
          type: String,
          required: true
        }
      }
    ]
  }
}, { timestamps: true })

module.exports = mongoose.model('Tax', TaxSchema)