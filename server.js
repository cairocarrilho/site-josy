import express from 'express';
import {router} from "./src/routes/index.js"

const app = express();
const port = process.env.PORT || 3333;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})