const express = require("express");
const app = express();
const PORT = 3000;
const array = [];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome Homepage");
});

app.get("/show", (req, res) => {
    res.json(array);
  });

  app.post("/add", (req,res)=>{
    const data = req.body;
    array.push(data);
    res.send("Data is added")
  });

  app.patch("/update/:id",(req,res)=>{
    const {id} =req.params;
    const data = req.body;
    array = array.map((ele)=>(ele.id=== id ? {...ele,...data} : ele));
    res.send("data is updated")
  })

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
