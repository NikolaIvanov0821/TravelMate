import express from 'express';
import mongoose from 'mongoose';
import routes from './routes.js'
import { corsMiddleware } from './middlewares/cors.js';
import { authMiddleware } from './middlewares/auth.js';
import cors from "cors";

console.log('It works!');

try {
    await mongoose.connect('mongodb+srv://niivanov2008:niivanov2008@cluster0.dehwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { dbName: 'sneakerspot'})
    console.log('DB Connected!');
} catch (error) {
    console.log('Cannot connect to DB!');
}

const app = express();

app.use(express.json());
app.use(cors());
app.use(authMiddleware)

app.use(routes);

app.listen(3030, () => console.log("Server is listening on http://localhost:3030"))
