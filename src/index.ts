import 'reflect-metadata';
import express, { urlencoded, json } from 'express';
import tripRouter, { tripPath } from './routes/trip.route';
import compression from 'compression';
import mongoose from 'mongoose';
import cors from 'cors';

mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:27017/${process.env.DB_NAME}`,
  {
    authSource: 'admin',
  },
);

const port = process.env.PORT || 8000;
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(compression());
app.use(cors());

app.use(`/api/${tripPath}`, tripRouter);

app.get('/', (_, res) => {
  res.status(200).json({ ok: true });
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
