import { Document } from 'mongoose';

export interface IAccessToken extends Document {
  userId: string;
  clientId: string;
  token: string;
  created: any;
}
