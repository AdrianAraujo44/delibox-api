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

const categoryController = {
  newCategory
}

module.exports = { categoryController }