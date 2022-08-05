const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deliverySchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    default: ''
  },
  background: {
    type: String,
    default: ''
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  taxs: [{
    neighborhood:{
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  address: {
    uf: {
      type: String,
      required: true
    },
    cep:{
      type: String,
      required: true
    },
    city:{
      // type: String,
      // required: true
      type: Schema.Types.ObjectId,
      ref: 'Cities'
    },
    complement:{
      type: String,
      default: ''
    },
    neighborhood:{
      type: String,
      required: true
    },
    number:{
      type: String,
      required: true
    },
    street:{
      type: String,
      required: true
    },
  },
  hourWork: {
    monday: {
      am: {
        type: String,
        default: ''
      },
      pm: {
        type: String,
        default: ''
      }
    },
    tuesday: {
      am: {
        type: String,
        default: ''
      },
      pm: {
        type: String,
        default: ''
      }
    },
    wednesday: {
      am: {
        type: String,
        default: ''
      },
      pm: {
        type: String,
        default: ''
      }
    },
    thursday: {
      am: {
        type: String,
        default: ''
      },
      pm: {
        type: String,
        default: ''
      }
    },
    friday: {
      am: {
        type: String,
        default: ''
      },
      pm: {
        type: String,
        default: ''
      }
    },
    saturday: {
      am: {
        type: String,
        default: ''
      },
      pm: {
        type: String,
        default: ''
      }
    },
    sunday: {
      am: {
        type: String,
        default: ''
      },
      pm: {
        type: String,
        default: ''
      }
    },
    holiday:{
      am: {
        type: String,
        default: ''
      },
      pm: {
        type: String,
        default: ''
      }
    }
  },
  social: {
    facebook: {
      type: String,
      default: '',
    },
    instagram: {
      type: String,
      default: '',
    },
    whatsapp: {
      type: String,
      default: '',
    },
    youtube: {
      type: String,
      default: '',
    }
  },
}, { timestamps: true })

module.exports = mongoose.model('Delivery', deliverySchema)