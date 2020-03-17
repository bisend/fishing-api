export interface IError {
  statusCode: number;
  message: string;
  messages?: { [key: string]: string[] };
}

export default class BaseError implements IError {
  public statusCode: IError['statusCode'];
  public message: IError['message'];
  public messages: IError['messages'];
  constructor(statusCode?: IError['statusCode'], message?: IError['message'], messages?: IError['messages']) {
    this.statusCode = statusCode || 422;
    this.message = message || 'Unprocessable entity';
    this.messages = messages;
  }
}
