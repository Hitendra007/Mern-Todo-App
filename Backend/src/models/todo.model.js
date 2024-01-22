import mongoose from 'mongoose';
const todoSchema = mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    isCompleted:{
        type:Boolean,
        default:false,
    }
}, { timestamps: true })

export const Todo = mongoose.model('Todo',todoSchema)