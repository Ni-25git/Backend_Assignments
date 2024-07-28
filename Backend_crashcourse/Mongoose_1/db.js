// db.js
const mongoose = require('mongoose');

const url = "mongodb://127.0.0.1:27017/mongooseAssignment1";

const connectDb = async () => {
    try {
        await mongoose.connect(url)
        console.log("Connected to DB");
    } catch (error) {
        console.error("Failed to connect to DB", error);
    }
};

module.exports = connectDb;
