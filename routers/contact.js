const router = require('express').Router()
const { contactController } = require("../controllers/contact")

router.post("/addWhatsapp", async (req, res) => {
  contactController.addWhatsapp(req,res)
})

module.exports = router