const credentialModel = require('../models/credential')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
let refreshTokens = []

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
    const {email, password} = req.body
    const credential = await credentialModel.findOne({email})

    if(credential === null) {
      res.status(403).json({type: 'warning', message: "Email ou senha incorreto"})
    }else {
      const validPassword = await bcrypt.compare(password, credential.password)
      if(!validPassword) {
        res.status(403).json({type: 'warning', message: "Email ou senha incorreto"})
      }else {
        const accessToken = jwt.sign(
          { id:credential._doc._id, type:credential._doc.type }, 
          process.env.SECRETKEY,
          { expiresIn: "20s"}
        )

        const refreshToken = jwt.sign(
          { id:credential._doc._id, type:credential._doc.type }, 
          process.env.REFRESHSECRETKEY,
        )

        refreshTokens.push(refreshToken);

        res.status(200).json({
          deliveries: credential._doc.deliveries,
          accessToken,
          refreshToken
        })
      }
    }
  }catch(err) {
    res.status(500).json(err)
  }
}

const logout = async(req,res) => {
  try {
    const refreshToken = req.body.token
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
    res.status(200).json("You logged out successfully.")
  }catch(err) {
    res.status(500).json(err)
  }
}

const refreshToken = async(req,res) => {
  try{
    const { token } = req.body
    const refreshToken = token

    if(!refreshToken) return res.status(401).json("You are not authenticated")
    jwt.verify(refreshToken, process.env.REFRESHSECRETKEY, (err, payload) => {
      err && console.log(err)
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken)

      // console.log(payload)
      
      const newAccessToken = jwt.sign(
        { id:payload.id, type:payload.type }, 
        process.env.SECRETKEY,
        { expiresIn: "10s"}
      )

      const newRefreshToken = jwt.sign(
        { id:payload.id, type:payload.type }, 
        process.env.REFRESHSECRETKEY,
      )

      refreshTokens.push(newRefreshToken);
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    
    })
  }catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const deleteCredential = async(req,res) => {
  res.status(200).json(req.payload)
}
const credentialController = {
  newCredential,
  login,
  logout,
  refreshToken,
  deleteCredential
}

module.exports = { credentialController }