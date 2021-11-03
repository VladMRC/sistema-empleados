import {Router} from "express";
import UserController from "../controller/UserController";

const router = Router();
const userController = new UserController();

router.get('/', userController.all);
router.get('/:id', userController.one);
router.post('/create', userController.create);
router.put('/update/:id', userController.update);
router.delete('/remove/:id', userController.remove); 
// router-

export default router;