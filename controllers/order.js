const orderModel = require('../models/order')

// const newOrder = async(req,res) => {
//   try {
//     const order = new orderModel({...req.body})
//     await order.save()

//     res.status(200).json("order saved!")

//   }catch(err){
//     res.status(500).json(err)
//   }
// }

const newOrder = async(data) => {
  try {
    const order = new orderModel({...data})
    await order.save()

  }catch(err){
    console.log(err)
  }
}

const getAll = async(deliveryId) => {
  try {
    const response = await orderModel.find({deliveryId})
      .populate({path: "products.item", select: "name price"})
    return response
  }catch(err){
    console.log(err)
  }
}

const update = async(orderId, status) => {
  try {
    await orderModel.updateOne({_id: orderId}, {status: status})
    return
  }catch(err) {
    console.log(err)
  }
}

const updateNew = async(orderId) => {
  try {
    await orderModel.updateOne({_id: orderId}, {new: false})
    return
  }catch(err) {
    console.log(err)
  }
}

const orderController = {
  newOrder,
  getAll,
  update,
  updateNew
}

module.exports = { orderController }