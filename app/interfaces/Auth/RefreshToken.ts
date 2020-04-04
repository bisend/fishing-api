import { Document } from 'mongoose';

export interface IRefreshToken extends Document {
  userId: string;
  clientId: string;
  token: string;
  created: string;
}
