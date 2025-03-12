
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);

const CONNECTION_URL = 'mongodb://vanshaj:vanshaj@ac-kuza5y9-shard-00-00.lg7utjt.mongodb.net:27017,ac-kuza5y9-shard-00-01.lg7utjt.mongodb.net:27017,ac-kuza5y9-shard-00-02.lg7utjt.mongodb.net:27017/?ssl=true&replicaSet=atlas-mmfmi5-shard-0&authSource=admin&retryWrites=true&w=majority'
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);