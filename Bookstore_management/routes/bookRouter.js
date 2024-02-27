const express = require("express")
const { BookModel } = require('../model/bookModel')
const bookRouter = express.Router()


const validator = (req, res, next) => {
    const { title, author, ISBN } = req.body;
    if (!title || !author || !ISBN) {
        return res.status(400).json({ message: 'Title, author, and ISBN are required' });
    }
    next();
};



bookRouter.get('/books', async (req, res) => {
    try {
        const books = await BookModel.find();
        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found' });
        }

        res.status(200).json({ books: books });
    } catch (error) {
        console.error('Error retrieving books:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


bookRouter.post('/books/add', validator, async (req, res) => {
    try {
        const newBook = new BookModel(req.body);
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully' });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


bookRouter.get('/books/search', async (req, res) => {
    try {
        const { q } = req.query; 

        
        const books = await BookModel.find({
            $or: [
                { title: { $regex: new RegExp(q, 'i') } }, 
                { author: { $regex: new RegExp(q, 'i') } } 
            ]
        });


        res.status(200).json({ books: books });
    } catch (error) {
        console.error('Error searching for books:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
bookRouter.put('/books/update/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const updatedDetails = req.body; 
        const updatedBook = await BookModel.findByIdAndUpdate(id, updatedDetails, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book details updated successfully' });
    } catch (error) {
        console.error('Error updating book details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

bookRouter.delete('/books/delete/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedBook = await BookModel.findByIdAndDelete(id);


        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports={
    bookRouter
}