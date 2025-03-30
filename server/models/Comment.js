import { Schema, Types, model } from "mongoose";

const commentSchema = new Schema({
    content: { 
        type: String, 
        required: true 
    },
    author: { 
        type: Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    blog: { 
        type: Types.ObjectId, 
        ref: 'Blog', 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Comment = model('Comment', commentSchema);

export default Comment;