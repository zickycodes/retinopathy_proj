import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EditOperatorDto {
  @IsNotEmpty()
  @IsString()
  o_first_name: string;
  @IsNotEmpty()
  @IsString()
  o_last_name: string;
  @IsNotEmpty()
  @IsString()
  o_phone_no: string;
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  o_email: string;
  //   @IsNotEmpty()
  //   o_password: string;
  @IsNotEmpty()
  o_hospital_id: string;
}
