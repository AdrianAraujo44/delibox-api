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
      type: Schema.Types.ObjectId,
      ref: 'City'
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
        start: {
          type: String,
          default: ''
        }, 
        end: {
          type: String,
          default: ''
        }
      },
      pm: {
        start: {
          type: String,
          default: ''
        }, 
        end: {
          type: String,
          default: ''
        }
      }
    },
    tuesday: {
      am: {
        start: {
          type: String,
          default: ''
        }, 
        end: {
          type: String,
          default: ''
        }
      },
      pm: {
        start: {
          type: String,
          default: ''
        }, 
        end: {
          type: String,
          default: ''
        }
      }
    },
    wednesday: {
      am: {
        start: {
          type: String,
          default: ''
        }, 
        end: {
          type: String,
          default: ''
        }
      },
      pm: {
        start: {
          type: String,
          default: ''
        }, 
        end: {
          type: String,
          default: ''
        }
      }
    },
    thursday: {
      am: {
        start: {
          type: String,
          default: ''
        }, 
        end: {
          type: String,
          default: ''
        }
      },
      pm: {
        start: {
          type: String,
          default: ''
        }, 
        end: {
          type: String,
          default: ''
        }
      }
    },
    friday: {
      am: {
        start: {
          type: String,
          default: ''
        }, 
        end: {
          type: String,
          default: ''
        }
      },
      pm: {
        start: {
          type: String,
          default: ''
        }, 
        end: {
          type: String,
          default: ''
        }
      }
    },
    saturday: {
      am: {
        start: {
          type: String,
          default: ''
        }, 
        end: {
          type: String,
          default: ''
        }
      },
      pm: {
        start: {
          type: String,
          default: ''
        }, 
        end: {
          type: String,
          default: ''
        }
      }
    },
    sunday: {
      am: {
        start: {
          type: String,
          default: ''
        }, 
        end: {
          type: String,
          default: ''
        }
      },
      pm: {
        start: {
          type: String,
          default: ''
        }, 
        end: {
          type: String,
          default: ''
        }
      }
    },
    holiday:{
      am: {
        start: {
          type: String,
          default: ''
        }, 
        end: {
          type: String,
          default: ''
        }
      },
      pm: {
        start: {
          type: String,
          default: ''
        }, 
        end: {
          type: String,
          default: ''
        }
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
    },
    twitter: {
      type: String,
      default: ''
    }
  },
}, { timestamps: true })

module.exports = mongoose.model('Delivery', deliverySchema)