import { Router } from "express";
import userService from "../services/userService.js";

const userController = Router();

userController.post('/register', async (req, res) => {
    try {
        const { username, phone, email, password } = req.body;
        const result = await userService.register(username, phone, email, password);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

userController.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userService.login(email, password);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

userController.post('/logout', async (req, res) => {
    res.status(204).end();
});

userController.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const result = await userService.getProfile(userId);
    res.json(result)
})

userController.get('/:userId/liked', async (req, res) => {
    try {
        const userId = req.params.userId;
        const likedProducts = await userService.getLikedProducts(userId);
        res.json(likedProducts);
    } catch (error) {
        console.log(error);
    }
});

userController.post('/:userId/liked', async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedLikes = await userService.likeProduct(userId, req.body.productId);
        res.json(updatedLikes);
    } catch (error) {
        console.log(error);
    }
});

userController.put('/:userId/liked', async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedLikes = await userService.unlikeProduct(userId, req.body.productId);
        res.json(updatedLikes);
    } catch (error) {
        console.log(error);
    }
});

userController.post('/:userId/reviews', async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedReviews = await userService.addReview(userId, req.body);
        res.json(updatedReviews)
    } catch (error) {
        console.log(error);
    }
});

userController.put('/:userId/reviews', async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedReviews = await userService.deleteReview(userId, req.body);
        res.json(updatedReviews)
    } catch (error) {
        console.log(error);
    }
});

export default userController;