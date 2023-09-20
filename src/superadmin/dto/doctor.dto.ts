import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class Doctordto {
  @IsNotEmpty()
  @IsString()
  first_name: string;
  @IsNotEmpty()
  @IsString()
  last_name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  state_of_origin: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  phone_no: string;
}
