import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class PatientRecordDto {
  @IsNotEmpty()
  @IsNumber()
  patientId: number;
  @IsNotEmpty()
  @IsString()
  patient_pic: string;
  @IsNotEmpty()
  @IsString()
  pr_complaint: string;
  @IsNotEmpty()
  @IsString()
  pr_pic_id: string;
  // @IsNotEmpty()
  // @IsNumber()
  // operator_id: number;
}
