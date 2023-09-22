import {
  Body,
  Controller,
  Post,
  Put,
  Query,
  // UseGuards,
  UsePipes,
  UploadedFile,
  ValidationPipe,
  Get,
  Param,
  UseGuards,
  Request,
  Delete,
  UseInterceptors,
  HttpException,
} from '@nestjs/common';

// import { SignUpDto } from '../dto/signupdto';
// import { LoginDto } from '../dto/logindto';
// import { AuthService } from '../services/auth.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { HospitalService } from 'src/superadmin/services/hospital.service';
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
// import { AuthGuard } from '../services/auth.guard';

@Controller('/hospital-admin')
export class HospitalController {
  constructor(
    private operatorService: OperatorService,
    private patientService: PatientService,
    private patientRecordService: PatientRecordService,
  ) {}

  // Operators Controller Erros

  @UseGuards(HospitalAdminGuard)
  @Get('/get-operator')
  showDoctors(@Query('id') id: string) {
    if (id) {
      return this.operatorService.showOperator(id);
    }
    return this.operatorService.showOperators();
  }

  @UseGuards(HospitalAdminGuard)
  @Post('/add-operator')
  @UsePipes(new ValidationPipe())
  addDoctors(@Body() body: OperatorDto) {
    // console.log(body);
    return this.operatorService.addOperators(body);
  }

  @UseGuards(AdminGuard)
  @Put('/edit-operators/:id')
  @UsePipes(new ValidationPipe())
  editDoctors(@Body() body: OperatorDto, @Param() param: any) {
    // console.log(body);
    return this.operatorService.editOperators(param.id, body);
  }

  @UseGuards(HospitalAdminGuard)
  @Delete('/delete-operator/:id')
  deleteDoctors(@Body() body: OperatorDto, @Param() param: any) {
    // console.log(body);
    return this.operatorService.deleteOperator(param.id);
  }

  // Patient Controller errors
  @UseGuards(HospitalAdminGuard)
  @Get('/get-patient')
  showPatient(@Query('id') id: string) {
    if (id) {
      return this.patientService.showPatient(id);
    }
    return this.patientService.showPatients();
  }

  @UseGuards(HospitalAdminGuard)
  @Post('/add-patients')
  @UsePipes(new ValidationPipe())
  addPatients(@Body() body: PatientDto) {
    // console.log(body);
    return this.patientService.addPatients(body);
  }

  @Put('/edit-patient')
  @UseGuards(HospitalAdminGuard)
  @UsePipes(new ValidationPipe())
  editPatient(@Body() body: PatientDto, @Param() param: any) {
    // console.log(body);
    return this.patientService.editPatient(param.id, body);
  }

  @Delete('/delete-patient/:id')
  @UseGuards(HospitalAdminGuard)
  deletePatient(@Param() param: any) {
    // console.log(body);
    return this.patientService.deletePatient(param.id);
  }

  // Patients_Records
  // @UseGuards(HospitalAdminGuard)
  @Post('/add-record')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('patient_pic', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, new Date().toISOString() + '-' + file.originalname);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (extname(file.originalname).toLowerCase() !== '.pdf') {
          return cb(null, false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 1.5 * 1024 * 1024, // 1.5MB limit
      },
    }),
  )
  addRecord(@Body() body: PatientRecordDto, @UploadedFile() file) {
    // console.log(body);
    if (file === undefined) {
      throw new HttpException(
        {
          statusCode: 402,
          error: 'Only accept PDF files',
        },
        402,
      );
    }
    console.log(file.name);
    console.log(body);
    // return this.patientRecordService.addRecord(body);
  }

  @Put('/edit-record')
  @UseGuards(HospitalAdminGuard)
  @UsePipes(new ValidationPipe())
  editRecord(@Body() body: PatientRecordDto, @Param() param: any) {
    // console.log(body);
    return this.patientRecordService.editRecord(param.id, body);
  }

  @Delete('/delete-record/:id')
  @UseGuards(HospitalAdminGuard)
  deleteRecord(@Param() param: any) {
    // console.log(body);
    return this.patientRecordService.deleteRecord(param.id);
  }

  // @UseGuards(HospitalAdminGuard)
  // @Post('/add-file')
  // addRecord(@Query('id') id: string) {
  //   if (id) {
  //     return this.patientRecordService.showPatient(id);
  //   }
  //   return this.patientRecordService.showPatients();
  // }
}
