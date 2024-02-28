const express = require('express');
const {connection} = require("./db");
const {movieRouter} = require("./routes/movieRouter")

const app = express();

app.use(express.json());
app.use("/",movieRouter)



const PORT = 3000;
app.listen(PORT, async() => {
    try {
        await connection
        console.log(`Server is running on port ${PORT} and db is connected`);

    } catch (error) {
        console.log({error:"error"})
    }
});
