const router = require('express').Router()
const { deliveryController } = require('../controllers/delivery')
const { verifyToken } = require('../services/auth')

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

module.exports = router