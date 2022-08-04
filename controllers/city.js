const cityModel = require('../models/city')

const getCity = async(req,res) => {
  try{
    const response = await cityModel.findById(req.params.id)
    res.status(200).json(response)
  }catch(err){
    res.status(500).json(err)
  }
}

const cityController = {
  getCity
}

module.exports = { cityController }