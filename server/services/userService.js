import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from "../models/User.js";

const userService = {
    async register(username, phone, email, password) {
        const user = await User.findOne({email});
        console.log(user);
        if (user) {
            throw new Error('User already exists');
        }

        const hashed = await bcrypt.hash(password, 10)
        const createdUser = await User.create({ username, phone, email, password: hashed });

        return generateResponse(createdUser);
    },
    async login(email, password) {
        const user = await User.findOne({email});
        console.log(user);

        if (!user) {
            throw new Error('Invalid user or password');
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid user or password');
        }

        return generateResponse(user);
    },
    async logout() {
        // TODO: Invalidate token
        
        return true;
    },

    async getProfile(userId) {
        const user = await User.findById(userId);
        return user;
    },

    async getLikedProducts(userId) {
        const user = await User.findById(userId);
        return user.liked;
    },

    async likeProduct(userId, productId) {
        const user = await User.findById(userId);
        console.log(user);

        if (!user.liked.includes(productId)) {
            user.liked.push(productId); 
            await user.save(); 
        }

        return user.liked; 
    },

    async unlikeProduct(userId, productId) {
        const user = await User.findById(userId);

        if (user.liked.includes(productId)) {
            user.liked.pop(productId); 
            await user.save(); 
        }

        return user.liked; 
    },

    async addReview(userId, review) {
        const user = await User.findById(userId);

        if (!user.reviews.includes(review)) {
            user.reviews.push(review);
            await user.save();
        }

        return user.reviews;
    },

    async deleteReview(userId, review) {
        const user = await User.findById(userId);

        if (user.reviews.includes(review)) {
            const index = user.reviews.indexOf(review);
            delete user.reviews[index];
            await user.save();
        }

        return user.reviews;
    }
}

function generateResponse(user) {
    const payload = {
        _id: user._id,
        email: user.email,
    };

    const token = jwt.sign(payload, 'MYSECRET', { expiresIn: '2d' });

    return {
        _id: user._id,
        email: user.email,
        accessToken: token,
    };
}

export default userService;