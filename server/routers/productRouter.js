const express = require("express")
const router = express.Router()
const productFunc = require("../controllers/productController")
const verifyJWT = require("../middleware/verifyJWT")

// router.use(verifyJWT)
router.get("/",productFunc.getAllProducts)
router.get("/:_id",productFunc.getProductById)
router.post("/",productFunc.addProduct)
router.put("/:_id",productFunc.updateProduct)
router.delete("/:_id",productFunc.deleteProduct)

module.exports = router