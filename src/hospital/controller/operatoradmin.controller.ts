// import {
//   Body,
//   Controller,
//   Post,
//   Put,
//   Query,
//   Req,
//   // UseGuards,
//   UsePipes,
//   UploadedFile,
//   ValidationPipe,
//   Get,
//   Param,
//   UseGuards,
//   // Request,
//   Delete,
//   UseInterceptors,
//   HttpException,
// } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { OperatorGuard } from 'src/guards/operator.guard';
// import { PatientDto } from '../dto/patientdto';
// import { PatientRecordService } from '../services/patients_record.service';
// import { PatientService } from '../services/patients.service';
// import { diskStorage } from 'multer';
// import { PatientRecordDto } from '../dto/patientsrecorddto';

// @Controller('/operator-admin')
// export class HospitalOperatorController {
//   constructor(
//     // private operatorService: OperatorService,
//     private patientService: PatientService,
//     private patientRecordService: PatientRecordService,
//   ) {}

//   // Patient Controller errors
//   @UseGuards(OperatorGuard)
//   @Get('/get-patient')
//   showPatient(@Query('id') id: string) {
//     if (id) {
//       return this.patientService.showPatient(id);
//     }
//     return this.patientService.showPatients();
//   }

//   @Post('/add-patient')
//   @UseGuards(OperatorGuard)
//   @UsePipes(new ValidationPipe())
//   addPatients(@Body() body: PatientDto) {
//     // console.log(body);
//     return this.patientService.addPatients(body);
//   }

//   @Put('/edit-patient/:id')
//   @UseGuards(OperatorGuard)
//   @UsePipes(new ValidationPipe())
//   editPatient(@Body() body: PatientDto, @Param() param: any) {
//     // console.log(body);
//     return this.patientService.editPatient(param.id, body);
//   }

//   @Delete('/delete-patient/:id')
//   @UseGuards(OperatorGuard)
//   deletePatient(@Param() param: any) {
//     // console.log(body);
//     return this.patientService.deletePatient(param.id);
//   }

//   // Patients_Records
//   @Post('/add-record')
//   @UseGuards(OperatorGuard)
//   @UsePipes(new ValidationPipe())
//   @UseInterceptors(
//     FileInterceptor('patient_pic', {
//       storage: diskStorage({
//         destination: './uploads',
//         filename: (req, file, cb) => {
//           cb(null, new Date().toISOString() + '-' + file.originalname);
//         },
//       }),
//       // fileFilter: (req, file, cb) => {
//       //   if (extname(file.originalname).toLowerCase() !== '.pdf') {
//       //     return cb(null, false);
//       //   }
//       //   cb(null, true);
//       // },
//       limits: {
//         fileSize: 1.5 * 1024 * 1024, // 1.5MB limit
//       },
//     }),
//   )
//   addRecord(@Body() body: PatientRecordDto, @UploadedFile() file) {
//     // console.log(body);
//     if (file === undefined) {
//       throw new HttpException(
//         {
//           statusCode: 402,
//           error: 'No file uploaded',
//         },
//         402,
//       );
//     }
//     console.log(file);
//     return this.patientRecordService.addRecord(body, file.path);
//   }
//   @Put('/edit-record/:id')
//   @UseGuards(OperatorGuard)
//   @UsePipes(new ValidationPipe())
//   editRecord(@Body() body: PatientRecordDto, @Param() param: any) {
//     // const filePath = file ? file.path : 'No file uploaded';
//     // console.log(body);
//     return this.patientRecordService.editRecord(param.id, body);
//   }

//   @Delete('/delete-record/:id')
//   @UseGuards(OperatorGuard)
//   deleteRecord(@Param() param: any) {
//     // console.log(body);
//     return this.patientRecordService.deleteRecord(param.id);
//   }
// }
