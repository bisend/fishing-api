import mongoose, { Schema } from 'mongoose';
import { IAccessToken } from '../../interfaces/Auth/AccessToken';

const accessTokenSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  clientId: {
    type: String,
    required: true
  },
  token: {
    type: String,
    unique: true,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
});

const AccessToken = mongoose.model<IAccessToken>('AccessToken', accessTokenSchema);

export default AccessToken;
