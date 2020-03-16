import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  phone_number: String,
  first_name: String,
  last_name: String,
});

const User = mongoose.model('User', userSchema);

export default User;
