const router = require('express').Router()
const { cityController } = require('../controllers/city')
const { verifyToken } = require('../services/auth')

router.get("/:id", verifyToken, async(req,res) => {
  cityController.getCity(req,res)
})

module.exports = router