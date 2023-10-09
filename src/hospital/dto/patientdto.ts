import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PatientDto {
  @IsNotEmpty()
  @IsString()
  p_first_name: string;
  @IsNotEmpty()
  @IsString()
  p_last_name: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  p_email: string;
  @IsNotEmpty()
  p_dob: string;
  @IsNotEmpty()
  p_phone_no: string;
  @IsNotEmpty()
  p_state: string;
  @IsNotEmpty()
  p_lga: string;
  @IsNotEmpty()
  p_nok: string;
  @IsNotEmpty()
  p_relationship_with_nok: string;
  @IsNotEmpty()
  p_phone_no_of_nok: string;
}
