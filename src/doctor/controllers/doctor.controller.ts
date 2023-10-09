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
import { DoctorSService } from '../services/doctor.service';
import { patientresultdto } from '../dto/patientresDto';
import { DiagnosisInterceptor } from 'src/interceptors/diagnosis.interceptor';

@Controller('/doctor')
export class DoctorController {
  constructor(private doctorService: DoctorSService) {}

  @UseGuards(DoctorGuard)
  @Get('/new-record')
  showNewRecord() {
    return this.doctorService.showNewPatients();
  }

  @UseGuards(DoctorGuard)
  @Get('/one-time-patients')
  oneTime(@Request() req) {
    // console.log(req.user.sub);
    return this.doctorService.oneTimePatients(req.user.sub);
  }

  @UseGuards(DoctorGuard)
  @Get('/inconclusive-patients/')
  inconclusives(@Request() req) {
    return this.doctorService.inconclusivePatient(req.user.sub);
  }

  @UseGuards(DoctorGuard)
  @UseInterceptors(DiagnosisInterceptor)
  @UsePipes(new ValidationPipe())
  @Post('/give-diagnosis')
  giveDiagnosis(@Body() body: patientresultdto, @Request() req) {
    return this.doctorService.givePatientDiagnosis(body, req.user.sub);
  }
}
