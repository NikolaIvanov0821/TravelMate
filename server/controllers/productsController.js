import { Router } from "express";
import productService from "../services/productService.js";

const productController = Router();

productController.get('/', async (req, res) => {
    const query = req.query;

    const products = await productService.getAll(query);

    res.json(products);
});

productController.post('/', async (req, res) => {
    const productData = req.body;

    try {
        const product = await productService.create(productData);
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

productController.get('/:productId', async (req, res) => {
    const product = await productService.getOne(req.params.productId);

    res.json(product);
});

productController.put('/:productId', async (req, res) => {
    const productData = req.body;
    const productId = req.params.productId;

    try {
        const updatedProduct = await productService.update(productId, productData);

        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

productController.delete('/:productId', async (req, res) => {
    try {
        await productService.delete(req.params.productId);

        res.status(204).end();
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

productController.get('/:productId/likes', async (req, res) => {
    const productId = req.params.productId
    const likes = await productService.getLikes(productId);

    res.json(likes)
});

productController.post('/:productId/likes', async (req, res) => {
    try {
        const productId = req.params.productId;
        const updatedLikes = await productService.likeProduct(productId, req.body.userId);
        res.json(updatedLikes);
    } catch (error) {
        console.log(error);
    }
});

productController.put('/:productId/likes', async (req, res) => {
    try {
        const productId = req.params.productId;
        const updatedLikes = await productService.unlikeProduct(productId, req.body.userId);
        res.json(updatedLikes);
    } catch (error) {
        console.log(error);
    }
});

productController.get('/:productId/reviews', async (req, res) => {
    try {
        const productId = req.params.productId;
        const reviews = await productService.getReviews(productId);
        res.json(reviews)
    } catch (error) {
        console.log(error);
    }
})

productController.post('/:productId/reviews', async (req, res) => {
    try {
        const productId = req.params.productId;
        const review = req.body;
        console.log(review);
        const updatedReviews = await productService.postReview(productId, review);

        res.json(updatedReviews)
    } catch (error) {
        console.log(error);
    }
});

productController.put('/:productId/reviews', async (req, res) => {
    try {
        const productId = req.params.productId;
        const review = req.body;
        console.log(review);
        const updatedReviews = await productService.deleteReview(productId, review);

        res.json(updatedReviews)
    } catch (error) {
        console.log(error);
    }
});

export default productController;