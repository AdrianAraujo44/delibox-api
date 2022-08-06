const categoryModel = require('../models/category')

const newCategory = async(req,res) => {
  try{
    const { name, deliveryId } = req.body
    const response = await categoryModel.findOne({name,deliveryId})
    if(response == null){
      const newCategory = new categoryModel({name,deliveryId})
      await newCategory.save()
  
      res.status(200).json({type: "success", message: "categoria criada com sucesso!"})
    }else {
      res.status(200).json({type: "warning", message: "já existe uma categoria cadastrada com esse nome!"})
    }

  }catch(err) {
    res.status(500).json(err)
  }
}

const getAll = async(req,res) => {
  try {
    const { id } = req.params
    const response = await categoryModel.find({deliveryId:id}, "name")

    res.status(200).json(response)
  }catch(err) {
    res.status(500).json(err)
  }
}

const update = async(req,res) => {
  try {
    const { name, newName } = req.body
    const { id } = req.params
    const response = await categoryModel.findOne({name: newName,deliveryId:id})

    if(response == null) {
      await categoryModel.updateOne({ name, deliveryId:id }, {name: newName})
      res.status(200).json({type: "success", message: "categoria atualizada com sucesso!"})
    }else {
      res.status(200).json({type: "warning", message: "já existe uma categoria cadastrada com esse nome!"})
    }

    
  }catch(err) {
    res.status(500).json(err)
  }
}

const categoryController = {
  newCategory,
  getAll,
  update
}

module.exports = { categoryController }