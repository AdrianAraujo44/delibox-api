const router = require('express').Router()
const { complementController } = require('../controllers/complement')
const { verifyToken } = require('../services/auth')

router.post("/novo", verifyToken, async(req,res) => {
  complementController.add(req,res)
})

router.get("/:deliveryId/all", verifyToken, async(req,res) => {
  complementController.getAll(req,res)
})

router.get("/:complementId", verifyToken, async(req,res) => {
  complementController.getOne(req,res)
})

router.put("/:complementId", verifyToken, async(req,res) => {
  complementController.updateOne(req,res)
})

router.delete("/:complementId", async(req,res) => {
  complementController.deleteOne(req,res)
})


module.exports = router