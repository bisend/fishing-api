import express from 'express';
import Router from './routes';
const app = express();

app.use(Router);

app.listen(3000, 'localhost', async (err) => {
  if (err) {
    console.log(err);
  }
  console.log(process.env.NODE_ENV);
  console.log(`App listening on port 3000!`);
});
