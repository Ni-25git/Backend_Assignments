const express = require("express")
const {MovieModel}= require("../model/movieModel")
const movieRouter = express.Router();

movieRouter.post('/movies', async (req, res) => {
    try {
      const movie = new MovieModel(req.body);
      await movie.save();
      res.status(200).json(movie);
    } catch (error) {
      console.error('Error creating movie:', error);
      res.status(400).json({ error: 'Internal server error' });
    }
  });
  
  movieRouter.get('/movies', async (req, res) => {
    try {
      const movies = await MovieModel.find();
      res.json(movies);
    } catch (error) {
      console.error('Error fetching movies:', error);
      res.status(400).json({ error: 'Internal server error' });
    }
  });

  movieRouter.put("/movies/update/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const updatedDetails = req.body;
        const updatedMovie = await MovieModel.findByIdAndUpdate(id,updatedDetails)
        if(!updatedMovie){
            return res.status(400).json({ message: 'Movie  not found' });
        }
        res.status(200).json({ message: 'Movies updated successfully' });
    } catch (error) {
        res.status(400).send({ error: ' error' });
    }
  })


  movieRouter.delete("/movies/delete/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const deletedMovie = await MovieModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Movies deleted successfully' });
    } catch (error) {
        res.status(400).send({ error: ' error' });
    }
  })
  module.exports={
    movieRouter
  }