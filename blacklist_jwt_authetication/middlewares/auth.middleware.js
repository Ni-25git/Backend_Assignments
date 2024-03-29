const jwt = require("jsonwebtoken")
const { blacklist } = require("../blacklist")

const auth = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        if(blacklist.includes(token)){
            res.send({msg:"login again"})
        }
    }

    jwt.verify(token,"masai",(err,decoded)=>{
        
        if(decoded){
            next();
        }else{
            res.status(400).send({err:"error"})
        }
    })
}


module.exports={
    auth
}
