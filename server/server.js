require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 1111
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
connectDB()
//middlewars
app.use(cors(corsOptions))
app.use(express.static("public"))
// app.use(express.json())
app.use(express.json({ limit: '30mb' }));
app.use("/api/user",require("./routers/userRouter"))
app.use("/api/product",require("./routers/productRouter"))
app.use("/api/basket",require("./routers/basketRouter"))



mongoose.connection.once('open',()=>{
    console.log("connect to mongoDB")
    app.listen(PORT,()=>{
        console.log(`run on port: ${PORT}`)
    })
})
mongoose.connection.on('error',err=>{console.log(err)})

