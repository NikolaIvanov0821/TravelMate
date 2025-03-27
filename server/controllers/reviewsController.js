import { Router } from "express";
import reviewService from "../services/reviewService.js";

const reviewsController = Router();

reviewsController.get('/', async (req, res) => {
    const query = req.query;
    const reviews = await reviewService.getAll(query);
    res.json(reviews);
});

reviewsController.post('/', async (req, res) => {
    const reviewData = req.body;

    try {
        const review = await reviewService.create(reviewData);
        res.json(review);
    } catch (error) {
        console.log(error);
    }
});

reviewsController.get('/:reviewId', async (req, res) => {
    const review = await reviewService.getOne(req.params.reviewId);

    res.json(review);
});

reviewsController.put('/:reviewId', async (req, res) => {
    const reviewData = req.body;
    const reviewId = req.params.reviewId;

    try {
        const updatedReview = await reviewService.update(reviewId, reviewData);

        res.json(updatedReview);
    } catch (error) {
        console.log(error);
    }
});

reviewsController.delete('/:reviewId', async (req, res) => {
    try {
        await reviewService.delete(req.params.reviewId);

        res.status(204).end();
    } catch (error) {
        console.log(error);
    }
});

export default reviewsController;
