import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
// import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());
// app.use(express.static('public'));

//Middleware for handling cors policy
//option 1: Allow all origins with default of cors(*)
app.use(cors());

//option 2: Allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:5173/',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );


app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send("Welcome To MERN Stack");
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected tp DB');
        app.listen(PORT, () => {
            console.log(`App is running in port: ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })