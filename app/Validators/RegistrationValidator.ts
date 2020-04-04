import { IsEmail, Length, IsNotEmpty, IsDefined } from 'class-validator';
import { IUser } from '../interfaces/User';

export class RegistrationValidator {
  @IsDefined({ message: 'E-mail обязательное поле' })
  @IsEmail({}, { message: 'E-mail должен быть корректно отформатирован' })
  public email: IUser['email'];

  @Length(6, 20, { message: 'Пароль должен быть не менее 6 символов' })
  public password: IUser['password'];

  @IsNotEmpty({ message: 'Телефон обязательное поле' })
  public phone_number: IUser['phone_number'];

  @IsNotEmpty({ message: 'Имя обязательное поле' })
  public first_name: IUser['first_name'];

  @IsNotEmpty({ message: 'Фамилия обязательное поле' })
  public last_name: IUser['last_name'];
}
