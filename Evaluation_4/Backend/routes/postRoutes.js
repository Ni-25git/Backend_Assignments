const express = require("express");
const { PostModel } = require("../models/postModel")
const {auth} = require("../middlewares/auth.middleware")

const postRouter = express.Router();

postRouter.post('/post/add', auth, async (req, res) => {
    try {
      const { title, body, device } = req.body;
      const post = new Post({ title, body, device, user: req.userId });
      await post.save();
      res.status(201).json({ message: 'Post created successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating post.' });
    }
  });
  
  // Get posts
  postRouter.get('/post', auth, async (req, res) => {
    try {
      const { device } = req.query;
      const filter = device ? { device } : {};
      const posts = await Post.find({ ...filter, user: req.userId });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching posts.' });
    }
  });
  
  // Update post
  postRouter.put('/post/update/:postId', auth, async (req, res) => {
    try {
      const { title, body, device } = req.body;
      const postId = req.params.postId;
      const post = await Post.findOneAndUpdate({ _id: postId, user: req.userId }, { title, body, device });
      if (!post) {
        return res.status(404).json({ message: 'Post not found or you are not authorized to update.' });
      }
      res.json({ message: 'Post updated successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating post.' });
    }
  });
  
  // Delete post
  postRouter.delete('/post/delete/:postId', auth, async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findOneAndDelete({ _id: postId, user: req.userId });
      if (!post) {
        return res.status(404).json({ message: 'Post not found or you are not authorized to delete.' });
      }
      res.json({ message: 'Post deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting post.' });
    }
  });

module.exports={
    postRouter
}