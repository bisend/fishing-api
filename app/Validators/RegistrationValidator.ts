import { IsEmail, Length, IsNotEmpty, IsDefined } from 'class-validator';
import { IUser } from '../interfaces/user';

export class RegistrationValidator {
  @IsDefined({ message: 'Email is required' })
  @IsEmail()
  public email: IUser['email'];

  @Length(6, 20)
  public password: IUser['password'];

  @IsNotEmpty()
  public phone_number: IUser['phone_number'];

  @IsNotEmpty()
  public first_name: IUser['first_name'];

  @IsNotEmpty()
  public last_name: IUser['last_name'];
}
