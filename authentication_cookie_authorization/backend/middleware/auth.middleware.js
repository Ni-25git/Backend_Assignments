const jwt = require("jsonwebtoken")
require("dotenv").config()


const auth = (req,res,next)=>{
// const token = req.cookies["nipun"]
const token = req.headers.authorization
if(token){
    jwt.verify(token,process.env.SecretKey, (err,result)=>{
        if(err){
            res.send({msg:err})
        }else{
            req.body.userid = result.userid
            req.body.pass = result.pass
            console.log(result)
            next()
        }
    })
    
}else{
    res.send({msg:"token is not valid"})
}
}

module.exports={
    auth
}