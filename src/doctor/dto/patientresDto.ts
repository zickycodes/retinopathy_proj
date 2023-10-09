import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class patientresultdto {
  @IsNotEmpty()
  @IsNumber()
  patient_record_id: number;
  // @IsNotEmpty()
  // @IsString()
  // patient_pic: string;
  // @IsNotEmpty()
  // @IsNumber()
  // doctor_id: number;
  @IsNotEmpty()
  @IsString()
  doctor_comment: string;
  @IsNotEmpty()
  @IsNumber()
  doctors_assessment: number;
}
