const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login =async(req,res)=>{
    const {usename,password} = req.body
    console.log(usename,password);
    if(!usename || !password)
        return res.status(400).send("all details are required")
    const checkName = await User.findOne({usename:usename}).lean()
    if(!checkName || !checkName.active)
        return res.status(401).json({message:"unathourize"})
    const match =await bcrypt.compare(password,checkName.password)
    if (!match)
        return res.status(401).json({message:"unathourize"})
    const userObjrct = {
        _id: checkName._id,
        name: checkName.name,
        usename: checkName.usename,
        email: checkName.email,
        roles: checkName.roles
    }
    const token = jwt.sign(userObjrct,process.env.TOKEN_PASSWORD)
    res.json({accesToken:token})
    
}
const register = async(req,res)=>{
    const {usename,password,name,email,phone} = req.body
    if(!usename || !password || !name || !email){
        return res.status(400).send("all details are required")
    }
    const checkName = await User.findOne({usename:usename}).lean()  
    if(checkName){
        return res.status(409).send("duplicate name")
    }
    const hashPassword = await bcrypt.hash(password,10)
    const user  = await User.create({usename,password:hashPassword,name,email,phone})
    if(!user)
        return res.status(400).send("bad request")  
    // res.json(user)
    // res.json(`user ${user.usename} with email : ${user.email} created succesfuly`)
     const userObjrct = {
        _id:user._id,
        name: user.name,
        usename: user.usename,
        email: user.email,
        roles: user.roles,
        phone: user.phone
    }
    const token = jwt.sign(userObjrct,process.env.TOKEN_PASSWORD)
    res.json({accesToken:token})
}

module.exports = {register,login}
