import { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    blogs: [{
        type: Types.ObjectId,
        ref: 'Blog'
    }],
    trips: [{
        type: Types.ObjectId,
        ref: 'Trip'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 10)

    this.password = hash
});

const User = model('User', userSchema)

export default User;