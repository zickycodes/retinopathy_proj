import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EditHospitaldto {
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
  admin_contact_info: string;
}
