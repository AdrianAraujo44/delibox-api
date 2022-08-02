const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next) => {
  const authHeader = req.headers.authorization
  if(authHeader) {
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.SECRETKEY, (err, payload) => {
      if(err) {
        return res.status(403).json("Token is not valid!")
      }
      req.payload = payload
      next()
    })
  }else {
    res.status(401).json("You are not authenticated")
  }
}

module.exports = { verifyToken }