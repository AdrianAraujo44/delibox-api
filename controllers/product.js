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
    const { productId } = req.body
    if(req.body.product == "null") req.body.product = ''
    await productModel.updateOne(
      {'_id': productId },
      {$set: {imageUrl: req.body.product}}
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

const get = async(req,res) => {
  try {
    const response = await productModel.findById(req.params.productId)
      .populate({
          path: "categories",
          select: "name"
        })
    if(response != null) {
      res.status(200).json({type:"success", product: response})
    }else {
      res.status(200).json({type:"warning", message:"erro ao buscar informações sobre o produto!"})
    }
  }catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const productController = {
  newProduct,
  addImage,
  edit,
  get
}

module.exports = { productController }