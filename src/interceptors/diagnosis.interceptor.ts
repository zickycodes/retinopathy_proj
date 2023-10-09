import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { InjectModel } from '@nestjs/sequelize';
import { PatientDiagnosis } from 'src/entities/Patient_diagnosis';

@Injectable()
export class DiagnosisInterceptor implements NestInterceptor {
  constructor(
    @InjectModel(PatientDiagnosis)
    private patientDiagnosis: typeof PatientDiagnosis,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    try {
      const diagnosis = await this.patientDiagnosis.findOne({
        where: {
          patient_record_id: request.body.patient_record_id,
        },
      });
      if (diagnosis) {
        throw new BadRequestException(
          "Patient's Record already has a diagnosis",
        );
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    // console.log(request.user.userId);

    // Access the data service methods and properties

    // Rest of the interceptor logic here
    // ...
    return next.handle();
  }
}
