import {
  Body,
  Controller,
  Post,
  // Put,
  // UseGuards,
  UsePipes,
  ValidationPipe,
  Get,
  // Param,
  UseGuards,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { DoctorGuard } from 'src/guards/doctor.guard';
import { DoctorService } from '../services/doctor.service';
import { patientresultdto } from '../dto/diagnosis.dto';
import { DiagnosisInterceptor } from 'src/interceptors/diagnosis.interceptor';

@Controller('/doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  @UseGuards(DoctorGuard)
  @Get('/newrecord')
  showNewRecord() {
    return this.doctorService.showNewPatients();
  }

  @UseGuards(DoctorGuard)
  @Get('/one-time-patients')
  oneTime(@Request() req) {
    return this.doctorService.oneTimePatients(req.id);
  }

  @UseGuards(DoctorGuard)
  @Get('/inconclusive-patients/id')
  inconclusives(@Request() req) {
    return this.doctorService.inconclusivePatient(req.id);
  }

  @UseGuards(DoctorGuard)
  @UseInterceptors(DiagnosisInterceptor)
  @UsePipes(new ValidationPipe())
  @Post('/give-diagnosis')
  giveDiagnosis(@Body() body: patientresultdto) {
    return this.doctorService.givePatientDiagnosis(body);
  }
}
