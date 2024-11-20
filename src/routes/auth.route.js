import {Router} from 'express';

import { LoginController} from '../controllers/login.controller.js';


//MIDDLEWARE
import {userLogin} from "../middlewares/validate.userData.js";
const loginController = new LoginController();


const loginrouter = Router();

// Rota para login de usuário
loginrouter.post('/login',loginController.login);




export{loginrouter}