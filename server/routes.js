import { Router } from "express";
import userController from "./controllers/userController.js";
import blogController from "./controllers/blogController.js";
import commentController from "./controllers/commentController.js";
import tripController from "./controllers/tripController.js";

const routes = Router();

routes.use('/users', userController);
routes.use('/blog', blogController);
routes.use('/comments', commentController);
routes.use('/trips', tripController);

export default routes;