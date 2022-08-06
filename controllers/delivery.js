const deliveryModel = require("../models/delivery")
const cityModel = require("../models/city")

const newDelivery = async(req,res) => {
  try{
    const newDelivery = new deliveryModel(req.body)
    await newDelivery.save()

    res.status(200).json({message: "Delivery has been saved"})
  }catch(err) {
    res.status(500).json(err)
  }
}

const getDelivery = async(req,res) => {
  try{
    const response = await deliveryModel.findById(req.params.id)
      .populate({path:"address.city", select: "_id name"})
    res.status(200).json(response)
  }catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const addTax = async(req,res) => {
  try{
    const { deliveryId, neighborhood, price } = req.body
    const deliveryResponse = await deliveryModel.findById(deliveryId,"taxs address")
    let duplicate = false
    const city = await cityModel.findById(deliveryResponse.address.city)

    if(!city.neighborhoods.includes(neighborhood)) {
      res.status(200).json({type:'warning', message: "esse bairro não pertence a essa cidade!"})
    }else {
      deliveryResponse.taxs.forEach((element) => {
        if(element.neighborhood == neighborhood) duplicate = true
      })
  
      if(duplicate == false) {
        await deliveryModel.updateOne(
          {'_id': deliveryId},
          {'$push': {
            'taxs': {
              neighborhood,
              price
            }
          }}
        )
        res.status(200).json({type:"success", message:"taxa criada com sucesso!"})
      }else {
        res.status(200).json({type:"warning", message:"já existe uma taxa cadastrada para o mesmo bairro!"})
      }
    }
  }catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const getAllTaxs = async(req,res) => {
  try{
    const { id } = req.params
    const response = await deliveryModel.findById(id, "taxs")

    if(response == null) {
      res.status(200).json({type:'error', message: "delivery não existe"})
    }else {
      res.status(200).json({type:'success', data: response.taxs})
    }
  }catch(err) {
    res.status(500).json(err)
  }
}

const deleteTax = async(req,res) => {
  try {
    await deliveryModel.updateOne(
      { '_id': req.params.deliveryId },
      {
        '$pull': {
          'taxs': {_id: req.params.taxId},
        }
      }
    )

    res.status(200).json({type:'success', message:'deletado com sucesso!'})
  }catch(err){
    res.status(500).json(err)
  }
}

const customization = async(req,res) => {
  try{
    const { deliveryId } = req.body
    if(req.body.logo == "undefined") req.body.logo = ''
    if(req.body.background == "undefined") req.body.background = ''

    await deliveryModel.findByIdAndUpdate(deliveryId, { 
      logo: req.body.logo, 
      background: req.body.background
    })

    res.status(200).json('success')
  }catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const updateSettings = async(req,res) => {
  try {
    const { deliveryId } = req.params
    let info = req.body
    const response = await cityModel.findOne({name:req.body.address.city})
    if(response == null ){
      res.status(200).json({type:"warning", message: "cidade não autorizada, entre em contato com o suporte!"})
    }else {
      info.address.city = response._id
      await deliveryModel.findByIdAndUpdate(deliveryId, {...info})
      res.status(200).json({type:"success", message:"informações atualizadas com sucesso!"})
    }
    
  }catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const deliveryController = {
  newDelivery,
  getDelivery,
  addTax,
  getAllTaxs,
  deleteTax,
  customization,
  updateSettings
}

module.exports = { deliveryController }