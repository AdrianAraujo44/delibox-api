const router = require('express').Router()
const { orderController } = require('../controllers/order')

router.post("/newOrder", async(req,res) => {
  orderController.newOrder(req,res)
})

router.get('/:code', async(req,res) => {
  orderController.getOrder(req,res)
})

module.exports = router