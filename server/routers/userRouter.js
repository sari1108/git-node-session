const express = require("express")
const router = express.Router()
const userFunctions = require("../controllers/userController")

router.post("/login",userFunctions.login)
router.post("/register",userFunctions.register)

module.exports = router