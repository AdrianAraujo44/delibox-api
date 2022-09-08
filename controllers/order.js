const orderModel = require('../models/order')
const deliveryModel = require('../models/delivery')

const newOrder = async (data) => {
  try {
    let codeExits = true
    let codes = await orderModel.find({}, "code")
    let code = ""
    let tax = 0
    const newCode = () => {
      const geraAlpha = () => {
        return String.fromCharCode(65 + Math.floor(Math.random() * 26))
      }

      const geraNumero = () => {
        return Math.floor(Math.random() * 10)
      }

      const reduce = Array(3).fill(0).reduce(prev => {
        return {
          alpha: prev.alpha + geraAlpha(),
          numero: prev.numero + geraNumero()
        }
      }, { alpha: '', numero: '' })

      return (`${reduce.alpha}${reduce.numero}`)
    }

    while (codeExits) {
      code = newCode()

      if (codes.includes(code)) {
        codeExits = true
      } else {
        codeExits = false
      }
    }

    const allTaxs = await deliveryModel.findOne({_id: data.deliveryId}, "taxs")
    allTaxs.taxs.forEach((item) => {
      if(item.neighborhood == data.client.address.neighborhood) {
        tax = item.price
      }
    })

    const order = new orderModel({
      code,
      status: [{ name: "IN_QUEUE", date: new Date() }],
      ...data,
      tax
    })
    await order.save()

    return code

  } catch (err) {
    console.log(err)
  }
}

const getAll = async (deliveryId) => {
  try {
    const response = await orderModel.find({ deliveryId })
      .populate({ path: "products.item", select: "name price" })
    return response
  } catch (err) {
    console.log(err)
  }
}

const update = async (orderId, statusName) => {
  try {
    const response = await orderModel.findOneAndUpdate({ _id: orderId },
      {
        '$push': {
          status: {
            name: statusName,
            date: new Date()
          },
        },
      },
      { new: true })
      .populate({ path: "products.item", select: "name price imageUrl" })
    return response
  } catch (err) {
    console.log(err)
  }
}

const updateNew = async (orderId) => {
  try {
    await orderModel.updateOne({ _id: orderId }, { new: false })
    return
  } catch (err) {
    console.log(err)
  }
}

const getOrder = async (req, res) => {
  try {
    const response = await orderModel.findOne({ code: req.params.code })
      .populate({ path: "products.item", select: "name price imageUrl" })

    res.status(200).json(response)
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
}

const count = async(req,res) => {
  try {
    const { deliveryId } = req.params
    const response = await orderModel.count({deliveryId: deliveryId })

    res.status(200).json(response)
  }catch(err) {
    res.status(500).json(err)
  }
}

const historic = async (req,res) => {
  try {
    const { deliveryId } = req.params
    const response = await orderModel.find({ deliveryId })
      .populate({ path: "products.item", select: "name price" })
    res.status(200).json(response)
  } catch (err) {
    res.status(500).json(err)
  }
}

const orderController = {
  newOrder,
  getAll,
  update,
  updateNew,
  getOrder,
  count,
  historic
}

module.exports = { orderController }