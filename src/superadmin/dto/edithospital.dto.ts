import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EditHospitaldto {
  @IsString()
  h_name: string;
  @IsNotEmpty()
  @IsString()
  h_address: string;
  @IsString()
  h_state: string;
  @IsNotEmpty()
  @IsEmail()
  h_email: string;
  @IsNotEmpty()
  h_admin_contact_info: string;
}
