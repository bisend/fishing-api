import mongoose, { Schema } from 'mongoose';
import { IClient } from '../../interfaces/Auth/Client';

const clientSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  clientId: {
    type: String,
    unique: true,
    required: true
  },
  clientSecret: {
    type: String,
    required: true
  },
});

const Client = mongoose.model<IClient>('Client', clientSchema);

export default Client;
