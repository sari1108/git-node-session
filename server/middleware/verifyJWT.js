const jet = require("jsonwebtoken")
const verifyJWT = (req,res,next)=>{

    const authHeader = req.headers.Authorization || req.headers.authorization
    if(!authHeader?.startsWith("Bearer"))
        return res.status(401).json({message: "unauthorized"})
    const token = authHeader.split(" ")[1]
    jet.verify(
        token,process.env.TOKEN_PASSWORD,
        (err, decode)=>{
            if(err)
                return res.status(401).json({message: "Forbidden"})
            req.user = decode
            next()

        }
    )
}
module.exports = verifyJWT