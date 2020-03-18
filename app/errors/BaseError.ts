export interface IError {
  statusCode?: number;
  message?: string;
  messages?: { [key: string]: string[] };
}

export default class BaseError implements IError {
  statusCode: IError['statusCode'];
  message: IError['message'];
  messages: IError['messages'];
  constructor(error: IError) {
    this.statusCode = error.statusCode || 422;
    this.message = error.message || 'Unprocessable entity';
    if (error.messages && typeof error.messages === 'object' && Object.keys(error.messages).length) {
      this.messages = error.messages;
    }
  }
}
