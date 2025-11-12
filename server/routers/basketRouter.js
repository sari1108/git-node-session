const express = require("express")
const router = express.Router()
const basketFunc = require("../controllers/basketCpntroller")
const verifyJWT = require("../middleware/verifyJWT")

router.use(verifyJWT)
router.get("/", basketFunc.getAllBasket)
router.put("/add", basketFunc.addToBasket)
router.put("/dec", basketFunc.decFromBasket)
router.delete("/", basketFunc.deleteFromBasket)




module.exports = router