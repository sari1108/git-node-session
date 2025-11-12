const mongoose = require("mongoose")
const basketModel = new mongoose.Schema(
    {
        iduser:{
            type: mongoose.Schema.Types.ObjectId,
            ref : "User",
            required: true         
        },
        idproduct:{
            type: mongoose.Schema.Types.ObjectId,
            ref : "Product",
            required: true    
        },
        count:{
            type: Number,
            default: 1
        }
    },{timestamps:true}
)
module.exports = mongoose.model("Basket",basketModel)