import express from "express";
import dotenv from "dotenv"
import network from "./network/routers";
import errorHandler from "./utils/error.handler";
dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', network)

app.use(errorHandler)

app.listen(process.env.PORT, ()=>{
    console.log(`Server running in ${process.env.PORT}`);
})