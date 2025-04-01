import { Router } from "express";
import blogService from "../services/blogService.js";


const blogController = Router();

blogController.get('/', async (req, res) => {
    const query = req.query;
    try {
        const result = await blogService.getAll(query);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error });
    }
});

blogController.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await blogService.getById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error });
    }
});

blogController.post('/', async (req, res) => {
    const postData = req.body;
    try {
        const result = await blogService.create(postData);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error });
    }
});

export default blogController;