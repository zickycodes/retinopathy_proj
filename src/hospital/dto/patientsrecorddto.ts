import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PatientRecordDto {
  @IsNotEmpty()
  @IsString()
  patient_id: string;
  // @IsNotEmpty()
  // @IsString()
  // patient_pic: string;
  @IsNotEmpty()
  @IsString()
  comment: string;
}
