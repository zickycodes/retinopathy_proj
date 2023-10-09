import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class patientdiagnosisdto {
  @IsNotEmpty()
  @IsNumber()
  patient_record_id: number;
  // @IsNotEmpty()
  // @IsString()
  // patient_pic: string;
  @IsNotEmpty()
  @IsString()
  patient_results: string;
  @IsNotEmpty()
  @IsString()
  comments: string;
  //   @IsNotEmpty()
  //   @IsNumber()
  //   doctors_assessment: number;
}
