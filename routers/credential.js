const router = require("express").Router()
const { credentialController } = require("../controllers/credential")

router.post("/newCredential", async(req,res) => {
  credentialController.newCredential(req,res)
})

router.post("/login", async(req,res) => {
  credentialController.login(req,res)
})

module.exports = router
