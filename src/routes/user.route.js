import {Router} from "express";
import{ UserController }from "../controllers/user.controller.js";

//MIDDLEWARE
import { validateUser,validateId} from "../middlewares/validate.userData.js";

const userRoute = Router()
const userController = new UserController

userRoute.post('/',userController.createUsers);
userRoute.get('/',  userController.getUsers );
userRoute.get('/:id',validateId, validateUser,userController.getUsersId);
userRoute.patch('/:id',validateId, validateUser,userController.updateUsers);


export {userRoute};