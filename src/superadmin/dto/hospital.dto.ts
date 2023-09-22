import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class Hospitaldto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  address: string;
  @IsString()
  state: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  admin_contact_info: string;
}
