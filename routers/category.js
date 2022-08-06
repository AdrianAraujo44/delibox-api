const router = require('express').Router()
const { categoryController } = require("../controllers/category")
const { verifyToken } = require('../services/auth')

router.post("/", verifyToken, async(req,res) => {
  categoryController.newCategory(req,res)
})

module.exports = router