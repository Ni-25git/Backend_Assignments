const express = require("express");
const { UserModel } = require("../models/userModel");
const userRouter = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

userRouter.post("/signup", async (req, res) => {
    const {email , pass} = req.body
    try {
        bcrypt.hash(pass , 8 , async (err,result)=>{
            if(err){
                res.status(200).send({"msg":"error"})
            }else{
                const data = new UserModel({email, pass:result})
                await data.save();
                res.send({ msg: "New user has been created" });
                console.log(req.body);
            }
        })
        
        
    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error" });
        console.error(error);
    }
});


userRouter.post("/login", async(req,res)=>{
    const {email , pass} = req.body
    try {
        const data = await UserModel.findOne({email})
        console.log(data)
        if(data){
            
            bcrypt.compare(pass,data.pass, (err,result)=>{
                
                if(result){
                    const token = jwt.sign({userid:data._id,pass: data.pass},process.env.SecretKey)
                    res.cookie("nipun",token,{ httpOnly: true, maxAge: 3600000 })
                    res.status(200).send({"msg":"User is logged in",token})
                }else{
                    res.status(200).send({"msg":"pass is incorrect"})
                }
                
            })
        }
    } catch (error) {
        
    }
})



module.exports = {
    userRouter
};