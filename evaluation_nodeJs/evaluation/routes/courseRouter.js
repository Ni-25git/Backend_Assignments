const express = require('express')
const CourseModel = require('../models/courseModel')
const courseRouter = express.Router()

courseRouter.use(express.json())


courseRouter.get("/get", (req,res)=>{
    res.send("welcome in course route")
})

courseRouter.post("/post", async(req,res)=>{
    try {
        const {id , title , category ,difficulty, description  } = req.body
        const course = await CourseModel.findOne({id,title});
        if(course){
            res.status(400).json({message: "this course already posted "})
        }
        const course1 = new CourseModel(req.body)
        await course1.save()
        res.status(201).json(course1)
    } catch (error) {
        res.status(500).json({message: "failed to post"})
    }
})


module.exports= courseRouter;