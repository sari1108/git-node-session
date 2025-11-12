const mongoose = require("mongoose")
const productSchema = new mongoose.Schema(
    {
        prodname:{
            type: String,
            unique:true,
            required:true
        },
        category:{
            type:String,
            enum: ["BabyClothes","babyAccessories","BabyProducts","babyDisney","newBorn"],
            default: "babyClothes"
        },
        price:{
            type:Number,
            required:true
        },
        image:{
            type:String,
            required: true
        }
    },{timestamps:true}
)
module.exports = mongoose.model("Product",productSchema)


