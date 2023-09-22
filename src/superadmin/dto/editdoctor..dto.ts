import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EditDoctordto {
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
  address: string;
  @IsNotEmpty()
  phone_no: string;
}
