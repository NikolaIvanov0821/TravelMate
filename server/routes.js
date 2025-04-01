import { Router } from "express";
import userController from "./controllers/userController.js";
import blogController from "./controllers/blogController.js";

const routes = Router();

routes.use('/users', userController)
routes.use('/blog', blogController)


export default routes;