import 'reflect-metadata';
import 'es6-shim';
import express from 'express';
import bodyParser from 'body-parser';
import Router from '../routes/index';
import db from '../database/connection';
import Exception from '../middlewares/Exception';
import passport from 'passport';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
require('./passport');

app.use(Router);
app.use(Exception);

const port = Number(process.env.PORT);

const startServer = () => {
  return new Promise(async (resolve, reject) => {
    const connected = await db();
    if (!connected) reject();
    app.listen(port, 'localhost', async (err) => {
      if (err) {
        console.log(err);
        reject();
      }
      resolve();
    });
  });
};

startServer().then(() => {
  console.log(`App listening: http://localhost:${port}`);
});
