import { Router } from "express";
import commentService from "../services/commentService.js";

const commentController = Router();

commentController.post('/', async (req, res) => {
    const comment = req.body;

    try {
        const result = await commentService.create(comment);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error });
    }
});

commentController.get('/', async (req, res) => {
    const filter = req.query;

    try {
        const result = await commentService.getAll(filter);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error });
    }
});

export default commentController;