import express from 'express'
import mongoose from 'mongoose';
import AppRoutes from './router/userRouter.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(cors());
app.use(AppRoutes)


mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
    .then(() => console.log("DataBase connection done "))
    .catch((error) => console.log(error))

app.listen(PORT, (req, res) => console.log(`App is listening to ${PORT}`))