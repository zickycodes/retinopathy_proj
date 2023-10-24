import {
  Body,
  Controller,
  Post,
  Put,
  Query,
  Req,
  Request,
  // UseGuards,
  UsePipes,
  UploadedFile,
  ValidationPipe,
  Get,
  Param,
  UseGuards,
  // Request,
  Delete,
  UseInterceptors,
  HttpException,
} from '@nestjs/common';

// import { SignUpDto } from '../dto/signupdto';
// import { LoginDto } from '../dto/logindto';
// import { AuthService } from '../services/auth.service';
import { AdminGuard } from 'src/guards/admin.guard';
// import { HospitalService } from 'src/superadmin/services/hospital.service';
import { HospitalAdminGuard } from 'src/guards/hospitaladmin.guard';
import { OperatorDto } from '../dto/operatordto';
import { PatientDto } from '../dto/patientdto';
import { OperatorService } from '../services/operator.service';
import { PatientService } from '../services/patients.service';
import { PatientRecordService } from '../services/patients_record.service';
import { PatientRecordDto } from '../dto/patientsrecorddto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { OperatorGuard } from 'src/guards/operator.guard';
import { EditOperatorDto } from '../dto/editoperatordto';
import { DiagnosisService } from '../services/diagnosis.service';
// import { AuthGuard } from '../services/auth.guard';

@Controller('/hospital-admin')
export class HospitalController {
  constructor(
    private operatorService: OperatorService,
    private patientService: PatientService,
    private patientRecordService: PatientRecordService,
    private diagnosisService: DiagnosisService,
  ) {}

  // Operators Controller Erros

  @UseGuards(HospitalAdminGuard)
  @Get('/get-operator')
  showOperator(@Query('id') id: number, @Request() req) {
    if (id) {
      return this.operatorService.showOperator(id);
    }
    return this.operatorService.showOperators(req.user.hos_id);
  }

  @UseGuards(HospitalAdminGuard)
  @Post('/add-operator')
  @UsePipes(new ValidationPipe())
  addOperator(@Body() body: OperatorDto, @Req() req) {
    // console.log(body);
    // console.log(req.user);
    // body['id'] = req.user.sub;
    return this.operatorService.addOperators(body);
  }

  @UseGuards(HospitalAdminGuard)
  @Put('/edit-operator/:id')
  @UsePipes(new ValidationPipe())
  editOperator(@Body() body: EditOperatorDto, @Param() param: any) {
    // console.log(body);
    return this.operatorService.editOperators(param.id, body);
  }

  @UseGuards(HospitalAdminGuard)
  @Delete('/delete-operator/:id')
  deleteOperators(@Body() body: OperatorDto, @Param() param: any) {
    // console.log(body);
    return this.operatorService.deleteOperator(param.id);
  }

  // Patient Controller errors
  @UseGuards(OperatorGuard)
  @Get('/get-patient')
  showPatient(@Query('id') id: string, @Request() req) {
    if (id) {
      return this.patientService.showPatient(id);
    }
    return this.patientService.showPatients(req.user.hos_id);
  }

  @Post('/add-patient')
  @UseGuards(OperatorGuard)
  @UsePipes(new ValidationPipe())
  addPatients(@Body() body: PatientDto, @Request() req) {
    // console.log(body);
    return this.patientService.addPatients(body, req.user.op_id);
  }

  @Put('/edit-patient/:id')
  @UseGuards(OperatorGuard)
  @UsePipes(new ValidationPipe())
  editPatient(@Body() body: PatientDto, @Param() param: any) {
    // console.log(body);
    return this.patientService.editPatient(param.id, body);
  }

  @Delete('/delete-patient/:id')
  @UseGuards(OperatorGuard)
  deletePatient(@Param() param: any) {
    // console.log(body);
    return this.patientService.deletePatient(param.id);
  }

  // Patients_Records

  // @Post('/add-record')
  // @UseGuards(OperatorGuard)
  // @UsePipes(new ValidationPipe())
  // @UseInterceptors(
  //   FileInterceptor('patient_pic', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: (req, file, cb) => {
  //         cb(null, new Date().toISOString() + '-' + file.originalname);
  //       },
  //     }),
  //     limits: {
  //       fileSize: 1.5 * 1024 * 1024, // 1.5MB limit
  //     },
  //   }),
  // )
  // addRecord(@Body() body: PatientRecordDto, @UploadedFile() file) {
  //   // console.log(body);
  //   if (file === undefined) {
  //     throw new HttpException(
  //       {
  //         statusCode: 402,
  //         error: 'No file uploaded',
  //       },
  //       402,
  //     );
  //   }
  //   console.log(file);
  //   return this.patientRecordService.addRecord(body, file.path);
  // }
  @Post('/add-record')
  @UseGuards(OperatorGuard)
  @UsePipes(new ValidationPipe())
  addRecord(@Body() body: PatientRecordDto, @Request() req) {
    // console.log(req.user.op_id);
    return this.patientRecordService.addRecord(body, req.user.op_id);
  }

  @UseGuards(OperatorGuard)
  @Get('/get-record')
  showRecord(@Query('id') id: string, @Request() req) {
    if (id) {
      return this.patientRecordService.showRecord(id);
    }
    return this.patientRecordService.showRecords(req.user.hos_id);
  }

  @UseGuards(OperatorGuard)
  @UsePipes(new ValidationPipe())
  @Put('/edit-record/:id')
  editRecord(
    @Body() body: PatientRecordDto,
    @Param() param: any,
    @Request() req,
    // @UploadedFile() file,
  ) {
    // const filePath = file ? file.path : 'No file uploaded';
    // console.log(body);
    return this.patientRecordService.editRecord(param.id, body, req.user.op_id);
  }

  @Delete('/delete-record/:id')
  @UseGuards(OperatorGuard)
  deleteRecord(@Param() param: any) {
    // console.log(body);
    return this.patientRecordService.deleteRecord(param.id);
  }

  // Diagnosis block
  @Get('/negative-diagnosed/:pageID')
  @UseGuards(OperatorGuard)
  negativeDiagnosis(@Request() req, @Param() param: { pageID: number }) {
    return this.diagnosisService.showNegativeDiagnosedPatient(
      req.user.hos_id,
      param.pageID,
    );
  }

  @Get('/positive-diagnosed/:pageID')
  @UseGuards(OperatorGuard)
  positiveDiagnosis(@Request() req, @Param() param: { pageID: number }) {
    return this.diagnosisService.showPositiveDiagnosedPatient(
      req.user.hos_id,
      param.pageID,
    );
  }

  @Get('/undiagnosed/:pageID')
  @UseGuards(OperatorGuard)
  undiagnosedPatients(@Request() req, @Param() param: { pageID: number }) {
    return this.diagnosisService.showUndiagnosedPatients(
      req.user.hos_id,
      param.pageID,
    );
  }

  // @UseGuards(OperatorGuard)
  // @UsePipes(new ValidationPipe())
  // @UseInterceptors(
  //   FileInterceptor('patient_pic', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: (req, file, cb) => {
  //         cb(null, new Date().toISOString() + '-' + file.originalname);
  //       },
  //     }),
  //     limits: {
  //       fileSize: 1.5 * 1024 * 1024, // 1.5MB limit
  //     },
  //   }),
  // )
  // @Put('/edit-record/:id')
  // editRecord(
  //   @Body() body: PatientRecordDto,
  //   @Param() param: any,
  //   @UploadedFile() file,
  // ) {
  //   // const filePath = file ? file.path : 'No file uploaded';
  //   // console.log(body);
  //   return this.patientRecordService.editRecord(
  //     param.id,
  //     body,
  //     file ? file.path : null,
  //   );
  // }

  // @UseGuards(HospitalAdminGuard)
  // @Post('/add-file')
  // addRecord(@Query('id') id: string) {
  //   if (id) {
  //     return this.patientRecordService.showPatient(id);
  //   }
  //   return this.patientRecordService.showPatients();
  // }
}
