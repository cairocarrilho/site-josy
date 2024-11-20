import {Router} from "express";
import {userRoute} from "./user.route.js";
import {loginrouter} from "./auth.route.js";

const router= Router();

router.use('/user',userRoute);
router.use('/auth',loginrouter);


export{router}
