const mongoose = require("mongoose")
const connectDB =async()=>{

    try{
        await mongoose.connect(process.env.DATA_BASE)
    }
    catch(err){
        console.error("*****error connection to DB😖😖😖****\n" + err)
    }

}
module.exports = connectDB