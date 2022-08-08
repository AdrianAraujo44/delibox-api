const productModel = require('../models/product')
const deliveryModel = require("../models/delivery")

const newProduct = async(req,res) => {
  try {
    const { id } = req.params
    const { name, price, categories, description } = req.body

    const newProduct = new  productModel({
      name, price, categories, description
    })
    const product = await newProduct.save()
    await deliveryModel.updateOne(
      {'_id': id},
      {'$push': {
        'products': product._id
      }}
    )
    res.status(200).json({type:"success", message:"produto criado com sucesso!", productId: product._id})

  }catch(err) {
    res.status(500).json(err)
  }
}

const addImage = async(req,res) => {
  try {
    const { productId, product } = req.body
    await productModel.updateOne(
      {'_id': productId },
      {$set: {imageUrl: product}}
    )
    res.status(200).json({type:"success", message: "imagem adicionanda com sucesso!"})
  }catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const edit = async(req,res) => {
  try {
    const { productId } = req.params
    await productModel.findOneAndUpdate({_id:productId}, {...req.body})

    res.status(200).json({type: "success", message:"produto atualizado com sucesso!"})
  }catch(err) {
    res.status(200).json(err)
  }
}

const productController = {
  newProduct,
  addImage,
  edit
}

module.exports = { productController }