const mongoose = require("mongoose")
const Product = require("../models/productsModel")
const getAllProducts = async(req,res)=>{
    console.log(req.params);

    const products = await Product.find().lean()
    console.log(products);
    
    res.json(products)
}
const getProductById = async(req,res)=>{
    const {_id} = req.params
    console.log(_id);
    const product = await Product.findById(_id)
    if(!product)
        return res.status(400).send("therh is no such a product")
    res.json(product)
}
const addProduct = async(req,res)=>{
    const {prodname,category,price, image } = req.body
    
    if(!prodname || !price)
        return res.status(400).send("name and price are required")
    const checkName = await Product.findOne({prodname:prodname}).lean()
    if (checkName)
        return res.status(400).send("product already exists")
    console.log(prodname );
    console.log(image);
    console.log(price);
    console.log(category);
    const newProduct = await Product.create({prodname,category,price,image })
    res.json(newProduct)

    
}
const updateProduct = async(req,res)=>{
    const {prodname,category,price ,image } = req.body
    const { _id } = req.params
    console.log(_id,prodname,category,price );
    if(!_id || !prodname || !price)
        return res.status(400).send("must enter id , name and price")
    const product = await Product.findById(_id)
    if(!product)
        return res.status(400).send("there is no such a product")
    product.prodname = prodname
    product.price = price
    product.category = category
    product.image = image
    const newProd = await product.save()
    res.json(newProd)
}
const deleteProduct = async(req,res)=>{
    const {_id} = req.params
    const product = await Product.findById(_id)
    if(!product)
        return res.status(400).send("therh is no such a product")
    const deleteProd = await product.deleteOne()
    res.json(`${product.prodname} deleted`)

}
module.exports = {getAllProducts,getProductById,addProduct,updateProduct,deleteProduct}