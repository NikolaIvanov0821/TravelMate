import { Router } from "express";
import userController from "./controllers/userController.js";
import blogController from "./controllers/blogController.js";
import commentController from "./controllers/commentController.js";

const routes = Router();

routes.use('/users', userController);
routes.use('/blog', blogController);
routes.use('/comments', commentController);

export default routes;