import {Schema, model, Document} from "mongoose";

interface ITodo extends Document {
   text : string,
   completed : boolean
}

const todoSchema = new Schema <ITodo>({
    text :{type: String , required:true},
    completed : {type: Boolean , required:true}
})

const Todo = model<ITodo>('Todo', todoSchema);

export {Todo , ITodo};