const router = require('express').Router()
const { productController } = require('../controllers/product')
const { verifyToken } = require('../services/auth')
const multer = require('multer')
const uploadImages = require('../services/firebase')

const Multer = multer({ storage: multer.memoryStorage()})

router.post("/novo/:id", verifyToken, async(req,res) => {
  productController.newProduct(req,res)
})

router.post("/addImage", verifyToken, Multer.fields([{name:'product'}]), uploadImages, async(req,res) => {
  productController.addImage(req,res)
})

router.put("/:productId", async(req,res) => {
  productController.edit(req,res)
})

module.exports = router