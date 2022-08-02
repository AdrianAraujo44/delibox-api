const router = require('express').Router()
const { deliveryController } = require('../controllers/delivery')

router.post("/newDelivery", async(req,res) => {
  deliveryController.newDelivery(req,res)
})

module.exports = router