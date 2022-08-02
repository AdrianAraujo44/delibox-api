const credentialModel = require('../models/credential')
const bcrypt = require('bcrypt')

const newCredential = async(req,res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    let credential = {
      email: req.body.email,
      deliveries:req.body.deliveries
    }
    credential.password = hashedPass
    const newCredential = new credentialModel(credential)
    await newCredential.save()

    res.status(200).json({message: "credential has been saved"})

  }catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const login = async(req,res) => {
  try {
    
  }catch(err) {
    res.status(500).json(err)
  }
}

const credentialController = {
  newCredential,
  login,
}

module.exports = { credentialController }