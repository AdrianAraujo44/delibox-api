const router = require("express").Router()
const { credentialController } = require("../controllers/credential")
const {verifyToken} = require('../services/auth')
router.post("/newCredential", async(req,res) => {
  credentialController.newCredential(req,res)
})

router.post("/login", async(req,res) => {
  credentialController.login(req,res)
})

router.post("/logout", verifyToken, async(req,res) => {
  credentialController.logout(req,res)
})

router.delete("/deleteCredential", verifyToken, async(req,res) => {
  credentialController.deleteCredential(req,res)
})

router.post("/refreshToken", async(req,res) => {
  credentialController.refreshToken(req,res)
})

module.exports = router
