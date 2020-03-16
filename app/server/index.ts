import express from 'express';
import Router from '../routes/index';
import db from '../database/connection';
const app = express();

app.use(Router);

const port = 3000;

const startServer = async () => {
  const connected = await db();
  if (!connected) return;
  app.listen(port, 'localhost', async (err) => {
    if (err) {
      console.log(err);
    }
  });
};

startServer().then(() => {
  console.log(`App listening: http://localhost:${port}`);
});
