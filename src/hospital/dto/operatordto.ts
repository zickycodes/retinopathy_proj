import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class OperatorDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;
  @IsNotEmpty()
  @IsString()
  last_name: string;
  @IsNotEmpty()
  @IsString()
  phone_no: string;
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  hospital_id: string;
}
