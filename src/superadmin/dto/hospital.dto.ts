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
  @IsString()
  contact_info: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
