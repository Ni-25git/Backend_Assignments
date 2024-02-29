const express=require("express");
const { UserModel } = require("../model/userModel");
const jwt = require("jsonwebtoken")
const userRouter = express.Router();
const bcrypt = require("bcrypt")



userRouter.post("/register",async(req,res)=>{
    const {username, pass , email , age} = req.body
    try {
        bcrypt.hash(pass, 5 ,async function(err,hash){
            if(err){
                res.send({msg:"error"})
            }
            else{
                const user = new UserModel({username,email,pass:hash,age})
                await user.save()
                res.status(200).send({msg: "New user has been added"})
            }
            
        });
        
    } catch (error) {
     res.status(400).send({msg:"error"})   
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,pass} = req.body
    try {
        const user = await UserModel.findOne({email,pass})
        if(user){
            bcrypt.compare(pass, user.pass , function(err,result){
                if(result){
                    const token = jwt.sign({course: "cap_backend"},"masai")
                    res.status(200).send({msg:"login successful" , token})
                }else{
                    res.status(200).send({msg:"Register first wrong credentials"})
                }
            });
            
        }
    } catch (error) {
        res.status(400).send({error:"error"})
    }
})

module.exports={
    userRouter
}