const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/authRouter");
const { movieRouter } = require("./routes/movieRouter");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(cookieParser());
app.use(express.json());
const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.use("/user", userRouter);
app.use("/movie", movieRouter); // Check if the movieRouter is imported correctly

app.listen(PORT, async (req, res) => {
    try {
        await connection;
        console.log(`Server is listening on PORT ${PORT} and the database is also connected`);
    } catch (error) {
        console.log(error);
    }
});
