// const mongoose = require("mongoose")
// const Basket = require("../models/basketModel")
// const Product = require("../models/productsModel")

// const getAllBasket = async (req, res) => {
//     console.log(req.user._id);
//     if (!req.user || !req.user._id) {
//         return res.status(401).json({ message: "User not authenticated" });
//     }

//     const basket = await Basket.find({ iduser: req.user._id }).populate("idproduct").lean()
//     if (!basket?.length)
//         return res.json({ message: "Empty basket" })
//     res.json(basket)
// }

// const addToBasket = async (req, res) => {
//     console.log(req.user);
//     const { _id } = req.body
//     if (!_id)
//         return res.status(404).json({ message: "id is required" })
//     const product = await Product.findById(_id)
//     if (!product) {
//         return res.status(408).send("No Product")
//     }
//     const check = await Basket.findOne({ iduser: req.user._id, idproduct: _id })
//     if (check) {
//         check.count++
//         await check.save()
//         res.json(check)
//     }
//     else {
//         const add = await Basket.create({ iduser: req.user._id, idproduct: _id })
//         await add.save()
//         res.json(add)
//     }
// }

// const deleteFromBasket = async (req, res) => {
//     const { _id } = req.body
//     console.log(_id);
//     if (!_id)
//         return res.status(404).json({ message: "id is required" })
//     const check1 = await Basket.findOne({ iduser: req.user._id, idproduct: _id })
//     if (!check1)
//         return res.status(408).send("No Product")
//     console.log(check1);
//     await check1.deleteOne()
//     res.json("delete completed")


// }
// const decFromBasket = async (req, res) => {
//     const { _id } = req.body
//     if (!_id)
//         return res.status(404).json({ message: "id is required" })
//     const prod = await Product.findById(_id)
//     if (!prod)
//         return res.status(408).send("No Product")
//     const check1 = await Basket.findOne({ iduser: req.user._id, idproduct: _id })
//     if (!check1)
//         return res.status(408).send("No Product")
//     if (check1.count == 1) {
//         await check1.deleteOne()
//         res.json("deleted completed")
//     } check1.count--
//     await check1.save()
//     res.json(check1)
// }
// module.exports = { getAllBasket, addToBasket, deleteFromBasket, decFromBasket }
const mongoose = require("mongoose")
const Basket = require("../models/basketModel")
const Product = require("../models/productsModel")
const getAllBasket = async (req, res) => {
    console.log(req.user._id);
    const basket = await Basket.find({ iduser: req.user._id }).populate("idproduct").lean()
    if (!basket?.length)
        return res.json({ message: "Empty basket" })
    res.json(basket)
}

const addToBasket = async (req, res) => {
    try {
        const { _id } = req.body;
        console.log("Product ID:", _id);
        if (!_id) return res.status(400).json({ message: "id is required" });
        const product = await Product.findById(_id);
        if (!product) return res.status(404).send("No Product");
        const check = await Basket.findOne({ iduser: req.user._id, idproduct: _id });

        if (check) {
            check.count++;
            await check.save();
            return res.json(check);
        } else {
            const newBasketItem = new Basket({
                iduser: req.user._id,
                idproduct: _id
            });

            await newBasketItem.save();
            return res.json(newBasketItem);
        }
    } catch (error) {
        console.error(" Error in addToBasket:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteFromBasket = async (req, res) => {
    const { _id } = req.body
    console.log(_id);
    if (!_id)
        return res.status(404).json({ message: "id is required" })
    const check1 = await Basket.findOne({ iduser: req.user._id, idproduct: _id })
    if (!check1)
        return res.status(408).send("No Product")
    console.log(check1);
    await check1.deleteOne()
    res.json("delete completed")
}
const decFromBasket = async (req, res) => {
    const { _id } = req.body
    if (!_id)
        return res.status(404).json({ message: "id is required" })
    const prod = await Product.findById(_id)
    if (!prod)
        return res.status(408).send("No Product")
    const check1 = await Basket.findOne({ iduser: req.user._id, idproduct: _id })
    if (!check1)
        return res.status(408).send("No Product")
    if (check1.count == 1) {
        await check1.deleteOne()
        res.json("deleted completed")
    } check1.count--
    await check1.save()
    res.json(check1)
}
module.exports = { getAllBasket, addToBasket, deleteFromBasket, decFromBasket }
