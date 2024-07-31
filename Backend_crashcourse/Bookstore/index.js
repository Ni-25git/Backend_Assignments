const express = require('express');
const connectDb = require('./db');
const UserModel = require('./models/usermodel');
const MovieModel = require('./models/movieModel');
const app= express();
const PORT = 4500;

app.use(express.json());

app.get("/",(req,res)=>{
res.send("welcome to new assignment")
})

app.get("/user/data", async(req,res)=>{
    try {
        const user = await UserModel.find()
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.post("/user",async(req,res)=>{
    try {
        const {name , email , pass } = req.body;
        const user = await UserModel.findOne({email,pass});
        if(user){
            return res.status(400).json({message: "user already exist"})
        }
        const newUser = new UserModel(req.body)
        await newUser.save() 
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.patch("/user/update/:id",async(req,res)=>{
try {
    const {id} = req.params
    const user = await UserModel.findByIdAndUpdate(id,req.body)
    if(!user){
        res.status(400).json({message: "User not found"})
    }
    res.status(201).json(user)
} catch (error) {
    res.status(500).json(error)
}
})

app.delete("/user/delete/:id",async(req,res)=>{
    try {
        const {id} = req.params
        const user = await UserModel.findByIdAndDelete(id,req.body)
        if(!user){
            res.status(400).json({message: "User not found"})
        }
        res.status(201).json({message: 'user should be deleted'})
    } catch (error) {
        res.status(500).json(error)
    }
})


//------------------------Movie routes---------------///


app.get("/movie/data", async(req,res)=>{
    try {
        const movie = await MovieModel.find()
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.post("/movie/post",async(req,res)=>{
    try {
        const {title , rating , releaseYear , genre} = req.body
        const movie = await MovieModel.findOne({title , releaseYear})
        if(movie){
            res.status(400).json({message: ' This movie already posted'})
        }
        const newMovie = new MovieModel(req.body)
        await newMovie.save()
        res.status(201).json(newMovie)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get("/movie/:id",async(req,res)=>{

    try {
        const {id} = req.params;
        const movie = await MovieModel.findById(id)
        if(!movie){
            res.status(400).json({message: ' movie not found'})
        }
        res.status(200).json(movie)
        
    } catch (error) {
        res.status(500).json(error)
    }
   
})


 
app.get("/movies/data/filter", async (req, res) => {
    try {
      const { title, rating, sortBy, page = 1, limit = 10 } = req.query;
      const filter = {};
  
      if (title) {
        filter.title = new RegExp(title, 'i'); // Case-insensitive search
      }
      
      if (rating) {
        filter.rating = rating;
      }
  
      // Set sorting based on the sortBy query parameter
      const sort = sortBy ? { [sortBy]: 1 } : {}; // Default sort to ascending order
  
      // Set pagination parameters
      const pageNumber = parseInt(page, 10);
      const pageSize = parseInt(limit, 10);
  
      // Find movies with filtering, sorting, and pagination
      const movies = await MovieModel.find(filter)
        .sort(sort)
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);
  
      // Count total number of movies to provide pagination information
      const totalMovies = await MovieModel.countDocuments(filter);
  
      res.status(200).json({
        totalMovies,
        totalPages: Math.ceil(totalMovies / pageSize),
        currentPage: pageNumber,
        movies
      });
    } catch (error) {
      console.error('Error retrieving movies:', error);
      res.status(500).json({ message: 'Error retrieving movies', error });
    }
  });
  



app.listen(PORT,async()=>{
    try {
        await connectDb()
        console.log(`server is listening on ${PORT}`)    
    } catch (error) {
     console.log(error)   
    }
    
})