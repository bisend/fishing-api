import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/user';

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  phone_number: String,
  first_name: String,
  last_name: String,
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
