const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CredentialSchema = new Schema ({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    default: 'admin'
  },
  deliveries: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Delivery'
    }
  ]

}, { timestamps: true })

module.exports = mongoose.model('Credential', CredentialSchema)