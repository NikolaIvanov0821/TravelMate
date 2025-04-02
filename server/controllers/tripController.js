import { Router } from "express";
import tripService from "../services/tripService.js";

const tripController = Router();

tripController.get('/', async (req, res) => {
    const query = req.query;

    try {
        const result = await tripService.getAll(query);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error });
    }
});

tripController.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await tripService.getOne(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error });
    }
});

tripController.post('/', async (req, res) => {
    const tripData = req.body;
    try {
        const result = await tripService.create(tripData);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error });
    }
});

tripController.put('/:id', async (req, res) => {
    const tripId = req.params.id;
    const updatedTrip = req.body;

    try {
        const result = await tripService.updateBlog(tripId, updatedTrip);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error });
    }
});

tripController.delete('/:id', async (req, res) => {
    const tripId = req.params.id;

    try {
        const result = await tripService.deleteBlog(tripId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error });
    }
});

export default tripController;