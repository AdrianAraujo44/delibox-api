const productModel = require('../models/product')
const deliveryModel = require("../models/delivery")
const categoryModel = require("../models/category")

const newProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { name, price, categories, description, complementId } = req.body

    const newProduct = new productModel({
      name,
      price,
      categories,
      description,
      complementId
    })

    const product = await newProduct.save()
    await deliveryModel.updateOne(
      { '_id': id },
      {
        '$push': {
          'products': product._id
        }
      }
    )

    categories.forEach(async (element) => {
      await categoryModel.updateOne(
        { '_id': element },
        {
          '$push': {
            'products': product._id
          }
        }
      )
    })
    res.status(200).json({ type: "success", message: "produto criado com sucesso!", productId: product._id })

  } catch (err) {
    res.status(500).json(err)
  }
}

const addImage = async (req, res) => {
  try {
    const { productId } = req.body
    if (req.body.product == "null") req.body.product = ''
    await productModel.updateOne(
      { '_id': productId },
      { $set: { imageUrl: req.body.product } }
    )
    res.status(200).json({ type: "success", message: "imagem adicionanda com sucesso!" })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const edit = async (req, res) => {
  try {
    const { productId } = req.params
    const { categories } = await productModel.findOne({ _id: productId }, "categories")
    let  product

    product = await productModel.findOneAndUpdate({ _id: productId }, { 
      name: req.body.name,
      price: req.body.price,
      categories: req.body.categories,
      description: req.body.description,
      complementId: req.body.complementId
    })

    req.body.categories.forEach(async (element) => {
      if (!product.categories.includes(element.toString())) {
        await categoryModel.updateOne(
          { '_id': element },
          {
            '$push': {
              'products': productId
            }
          }
        )
      }
    })

    categories.forEach(async(element) => {
      if (!req.body.categories.includes(element.toString())) {
        await categoryModel.updateOne(
          { '_id': element },
          {
            '$pull': {
              'products': productId
            }
          }
        )
      }
    })

    res.status(200).json({ type: "success", message: "produto atualizado com sucesso!" })
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
}

const get = async (req, res) => {
  try {
    const response = await productModel.findById(req.params.productId)
      .populate({
        path: "categories",
        select: "name"
      })
      .populate({
        path: "complementId",
        select: "title rules itens"
      })
    if (response != null) {
      res.status(200).json({ type: "success", product: response })
    } else {
      res.status(200).json({ type: "warning", message: "erro ao buscar informações sobre o produto!" })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const getAll = async (req, res) => {
  try {
    const { deliveryId } = req.params
    const response = await deliveryModel.findById(deliveryId, "products")
      .populate({ path: "products", select: "name description price imageUrl available" })

    res.status(200).json(response)
  } catch (err) {
    res.status(500).json(err)
  }
}

const count = async(req,res) => {
  try {
    const { deliveryId } = req.params
    const response = await deliveryModel.findById(deliveryId, "products")

    res.status(200).json(response.products.length)
  }catch(err) {
    res.status(500).json(err)
  }
}

const productController = {
  newProduct,
  addImage,
  edit,
  get,
  getAll,
  count
}

module.exports = { productController }