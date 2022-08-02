const deliveryModel = require("../models/delivery")

const newDelivery = async(req,res) => {
  try{
    const newDelivery = new deliveryModel(req.body)
    await newDelivery.save()

    res.status(200).json({message: "Delivery has been saved"})
  }catch(err) {
    res.status(500).json(err)
  }
}

const deliveryController = {
  newDelivery
}

module.exports = { deliveryController }