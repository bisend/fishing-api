import mongoose, { Schema } from 'mongoose';
import { IRefreshToken } from '../../interfaces/Auth/RefreshToken';

const refreshTokenSchema = new Schema({
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

const RefreshToken = mongoose.model<IRefreshToken>('RefreshToken', refreshTokenSchema);

export default RefreshToken;
