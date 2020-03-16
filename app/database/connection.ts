import mongoose from 'mongoose';

export default (async () => {
  const params = { useNewUrlParser: true, useUnifiedTopology: true, dbName: process.env.DB_NAME };
  const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`;
  try {
    await mongoose.connect(url, params);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
});
