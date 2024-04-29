import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

//components
import Connection from './database/db.js';
import Router from './routes/route.js';
import userRouter from './routes/user-routes.js';


dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));

//app.use('/', Router);
app.use('/user', userRouter);

Connection(process.env.CONNECTION_STRING);
