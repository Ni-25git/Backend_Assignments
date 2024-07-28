// index.js
const express = require('express');
const connectDb = require('./db');
const UserModel = require('./models/userModel');
const ProductModel = require('./models/productModel');
const app = express();
const PORT = 8080;

// Middleware to parse JSON
app.use(express.json());

app.get('/get', (req, res) => {
    res.send('welcome nipun');
});

app.get("/users/data", async(req,res)=>{
    try {
        const users = await UserModel.find();
        res.status(201).json(users)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

app.post('/users',async (req,res)=>{
try {
    const { email , name }= req.body;
    const user = await UserModel.findOne({ email, name})
    if(user){
        return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).json(newUser)
} catch (error) {
    res.status(500).json(error)
}
});

app.patch("/update/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await UserModel.findByIdAndUpdate(id,req.body);
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({error : 'error'})
    }
})

app.delete("/delete/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await UserModel.findByIdAndDelete(id, req.body)
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }
        res.status(201).json({message: 'User should be deleted'})
    } catch (error) {
        res.status(500).json(error)
    }
})

//<----------------product Routes Crud------------------->//

app.get("/product/data", async(req,res)=>{
    try {
        const product = await ProductModel.find()
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
})

app.post("/product", async(req,res)=>{
    try {
        const {name , price , brand , stock} = req.body
        const product = await ProductModel.findOne({name , brand})
        if(product){
            return res.status(400).json({ message: 'Product already exist' });
        }
        const newProduct = new ProductModel(req.body)
        await newProduct.save();
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
})

app.patch("/product/update/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await ProductModel.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: 'Product not found'})
        }
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
})

app.delete("/product/delete/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await ProductModel.findByIdAndDelete(id, req.body);
        if(!product){
            return res.status(404).json({message: 'Product not found'})
        }
        res.status(201).json({message: 'product should be deleted'})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
})

app.listen(PORT, async () => {
    try {
        await connectDb(); // Call the connectDb function
        console.log(`Server is listening on ${PORT}`);
    } catch (error) {
        console.log('Error in connecting to the DB', error);
    }
});
