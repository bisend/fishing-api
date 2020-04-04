import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string,
  password: string,
  phone_number: string,
  first_name: string,
  last_name: string,
}
