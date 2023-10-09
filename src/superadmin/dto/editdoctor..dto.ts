import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EditDoctordto {
  @IsNotEmpty()
  @IsString()
  d_first_name: string;
  @IsNotEmpty()
  @IsString()
  d_last_name: string;
  @IsNotEmpty()
  @IsEmail()
  d_email: string;
  @IsNotEmpty()
  d_address: string;
  @IsNotEmpty()
  d_phone_no: string;
}
