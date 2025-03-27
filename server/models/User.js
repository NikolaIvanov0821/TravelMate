import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: String,
    phone: String,
    email: String,
    password: String,
    liked: {
        type: Array
    },
    reviews: {
        type: Array
    },
    createdAt: String,
    updatedAt: String

});

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 10)

    this.password = hash
});

const User = model('User', userSchema)

export default User;