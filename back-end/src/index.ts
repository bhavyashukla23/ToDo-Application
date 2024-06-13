import express , {Request,Response} from "express";
import cors from "cors";
import mongoose from "mongoose";
import {Todo} from "./models/todo";

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = "mongodb://localhost:27017/todo-app";

mongoose.connect(mongoUri).then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log("Unable to connect", err);
});

//to fetch already existing todos
app.get('/todos',async(req:Request,res:Response)=>{
    const todos= await Todo.find();
    res.json(todos);
});

app.post('/todos', async(req:Request , res:Response)=>{
     const newTodo = new Todo({
        text:req.body.text,
        completed:false
    });
    await newTodo.save();
    res.json(newTodo);
});

app.put('/todos/:id',async(req:Request , res:Response)=>{
 const toDo = await Todo.findById(req.params.id);
 if(toDo){
   toDo.completed = !toDo.completed;
   await toDo.save();
   res.json(toDo);
 }else{
    res.status(404).json({message:"TODO NOT FOUND!"});
 }
});

app.delete('/todos/:id',async(req:Request , res:Response)=>{
  await Todo.findByIdAndDelete(req.params.id);
  res.json({message:"TODO DELETED!"});
});

app.listen(5000,()=>{
    console.log("Server at port 5000");
})