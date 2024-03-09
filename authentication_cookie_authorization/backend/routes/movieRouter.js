const express = require("express")
const { MovieModel } = require("../models/movieModel")
const movieRouter = express.Router()
const {auth} = require("../middleware/auth.middleware")
movieRouter.post("/create",auth,async(req,res)=>{
    try {
        const data = new MovieModel(req.body)
        await data.save()
        res.status(200).send({msg:"movies has been created"})


    } catch (error) {
        res.status(400).send({error})
            }
})

movieRouter.get("/getData",auth,async(req,res)=>{
    try {
        const data = await MovieModel.find()
        res.send(data)
        
    } catch (error) {
        res.send({msg:error})
    }
})

movieRouter.patch("/update/:id",async(req,res)=>{
    try {
        const {id} = req.params
        const data = await MovieModel.findByIdAndUpdate({_id:id},req.body)
        res.send({msg:`your data is update by id ${id}`})
    } catch (error) {
        res.send({msg:error})
    }
})

movieRouter.delete("/delete/:id",async(req,res)=>{
    try {
        const {id} = req.params
        const data = await MovieModel.findByIdAndDelete({_id:id})
        res.send({msg:`your data is deleted by id ${id}`})
    } catch (error) {
        res.send({msg:error})
    }
})

movieRouter.get("/show",auth,async(req,res)=>{
    try {
        const {year} = req.query
        const data = await MovieModel.find({year})
        res.send({msg:"data is find",data})
    } catch (error) {
        res.send({msg:error})
    }
})



module.exports={
    movieRouter
}