import { Router } from "express";
import blogService from "../services/blogService.js";


const blogController = Router();

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