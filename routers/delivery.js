const router = require('express').Router()
const { deliveryController } = require('../controllers/delivery')
const { verifyToken } = require('../services/auth')
const multer = require('multer')
const uploadImages = require('../services/firebase')

const Multer = multer({
  storage: multer.memoryStorage(),
  // limits: 1024 * 1024
})


router.post("/newDelivery", async(req,res) => {
  deliveryController.newDelivery(req,res)
})

router.get('/:id', verifyToken, async(req,res) => {
  deliveryController.getDelivery(req,res)
})

router.post("/addTax", verifyToken ,async(req,res) => {
  deliveryController.addTax(req,res)
})

router.get("/getAllTaxs/:id", verifyToken ,async(req,res) => {
  deliveryController.getAllTaxs(req,res)
})

router.delete("/deleteTax/:deliveryId/:taxId", verifyToken ,async(req,res) => {
  deliveryController.deleteTax(req,res)
})

router.post("/customization", verifyToken, Multer.fields([{name:'logo'}, {name:"background"}]), uploadImages, async(req,res) => {
  deliveryController.customization(req,res)
})

module.exports = router