import {Router} from "express";
import user from "./user_routes";

const routes = Router();

routes.use('/user', user);

export default routes;