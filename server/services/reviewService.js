import Review from "../models/Review.js"
import querystring from "querystring";

const reviewService = {
    getAll(filter = {}) {
        const query = Review.find();

        if (filter.where) {
            const q = querystring.parse(filter.where.replaceAll('"', ''))
            query.find(q)
        }

        return query
    },

    getOne(reviewId) {
        return Review.findById(reviewId);
    },

    create(review) {
        return Review.create(review);
    },

    update(reviewId, reviewData) {
        return Review.findByIdAndUpdate(reviewId, reviewData)
    },

    delete(reviewId) {
        return Review.findByIdAndDelete(reviewId);
    }
};

export default reviewService;