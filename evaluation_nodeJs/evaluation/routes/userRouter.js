const express = require('express')
const CourseModel = require('../models/courseModel')
const userRouter = express.Router()


userRouter.use(express.json())

userRouter.get("/get",(req,res)=>{
 res.send("welcome for the user")   
})


userRouter.get("/guestuser",async(req,res)=>{
     try {
        const course = await CourseModel.find()
        res.status(201).json(course)
     } catch (error) {
        res.status(500).json(error)
     }
   })

userRouter.get("/course/pagination", async(req,res)=>{
    try {
        const {category , difficulty , sortBy , page =1 ,limit=10} = req.query
        const filter={}

        if(category){
            filter.category = new RegExp(category, 'i')
        }

        if(difficulty){
            filter.difficulty = difficulty
        }

        const sort = sortBy ? {[sortBy]:1} : {}
        const pageNumber = parseInt(page,10);
        const pageSize = parseInt(limit,10);

        const course = await CourseModel.find(filter).sort(sort).skip((pageNumber-1)*pageSize).limit(pageSize)

        const totalCourses = await CourseModel.countDocuments(filter)
        res.status(200).json({
            totalCourses , 
            totalPages: Math.ceil(totalcourse/pageSize),
            currentPage: pageNumber,
            course
        })
    } catch (error) {
        res.status(500).json({message: 'error'})
    }
})



module.exports= userRouter