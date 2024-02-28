const express=require("express");
const { UserModel } = require("../model/userModel");
const jwt = require("jsonwebtoken")
const userRouter = express.Router();



userRouter.post("/register",async(req,res)=>{
    try {
        const user = new UserModel(req.body)
        await user.save()
        res.status(200).send({msg: "New user has been added"})
    } catch (error) {
     res.status(400).send({msg:"error"})   
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,pass} = req.body
    try {
        const user = await UserModel.findOne({email,pass})
        const token = jwt.sign({course: "cap_backend"},"masai")
        if(user){
            res.status(200).send({msg:"login successful" , token})
        }else{
            res.status(200).send({msg:"Register first wrong credentials"})
        }
    } catch (error) {
        res.status(400).send({error:"error"})
    }
})

module.exports={
    userRouter
}