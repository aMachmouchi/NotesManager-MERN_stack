import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Note } from "./models/noteModels.js";
import notesRoute from './routes/notesRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

//app.use(
  //  cors({
    //    origin: 'http://localhost:3000',
      //  methods: ['GET', 'POST', 'PUT', 'DELETE'],
        //allowedHeaders: ['Content-Type'],
    //})
//);

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to notes manager');
});

app.use('/notes', notesRoute);

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });
