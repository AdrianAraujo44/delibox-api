const router = require('express').Router()
const { orderController } = require('../controllers/order')
const { verifyToken } = require('../services/auth')

router.post("/newOrder", async(req,res) => {
  orderController.newOrder(req,res)
})

router.get('/:code', async(req,res) => {
  orderController.getOrder(req,res)
})

router.get("/count/:deliveryId", verifyToken,async(req,res) => {
  orderController.count(req,res)
})

router.get("/historic/:deliveryId", verifyToken, async(req,res) => {
  orderController.historic(req,res)
})

module.exports = router