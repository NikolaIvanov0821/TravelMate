import { Schema, Types, model } from "mongoose";

const blogSchema = new Schema({
    title: { 
        type: String, 
        required: true
    },
    content: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String, 
        required: false 
    }, 
    author: { 
        type: Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    likes: [{ 
        type: Types.ObjectId, 
        ref: 'User' 
    }],
    comments: [{ 
        type: Types.ObjectId, 
        ref: 'Comment'
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Blog = model('Blog', blogSchema);

export default Blog;