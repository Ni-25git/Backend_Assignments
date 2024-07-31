const express = require("express")
const fs= require("fs")
const app=express()
const PORT=3000;

const dirName = "server_dynamic"



app.get("/",(req,res)=>{
    const fileNames = fs.readdirSync(dirName)
    console.log("\nCurrent directory filenames:");
    filenames.forEach(file => { 
        console.log(file); 
      }); 
    
    res.send("Welcome nipun bhai")
})







app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`)
})