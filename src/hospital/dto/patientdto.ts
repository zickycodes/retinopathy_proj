import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PatientDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;
  @IsNotEmpty()
  @IsString()
  last_name: string;
  @IsNotEmpty()
  dob: string;
  @IsNotEmpty()
  phone_no: string;
  @IsNotEmpty()
  nok: string;
  @IsNotEmpty()
  relationship_with_nok: string;
  @IsNotEmpty()
  phone_no_of_nok: string;
}
