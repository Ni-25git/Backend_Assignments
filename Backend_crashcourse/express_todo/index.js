const express = require("express");
const app = express();
const PORT = 3000;
const fs = require("fs");

app.use(express.json());

const getTodo = () => {
    const data = fs.readFileSync("db.json", "utf-8");
    return JSON.parse(data);
};

const addTodo = (data) => {
    fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
};

app.get("/home", (req, res) => {
    res.send("Welcome to the home page");
});

app.get("/todos", (req, res) => {
    const db = getTodo();
    res.json(db.todos);
});

app.post("/add/todo", (req, res) => {
    const db = getTodo();
    const newTodo = {
        id: db.todos.length ? db.todos[db.todos.length - 1].id + 1 : 1,
        task: req.body.task,
        status: req.body.status || false
    };
    db.todos.push(newTodo);
    addTodo(db);
    res.status(201).json(newTodo);
});

app.patch('/update/todos', (req, res) => {
    const db = getTodo();
    db.todos.forEach(todo => {
        if (todo.id % 2 === 0 && todo.status === false) {
            todo.status = true;
        }
    });
    addTodo(db);
    res.json({ message: 'Updated status of even ID todos' });
});

app.delete("/delete/todos",(req,res)=>{
    const db=getTodo()
    db.todos = db.todos.filter(todo=> todo.status !== true);
    addTodo(db)
    res.json({ message: 'Deleted todos with status true' });
})

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
