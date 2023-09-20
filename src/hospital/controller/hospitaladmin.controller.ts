import {
  Body,
  Controller,
  Post,
  Put,
  Query,
  // UseGuards,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';

// import { SignUpDto } from '../dto/signupdto';
// import { LoginDto } from '../dto/logindto';
// import { AuthService } from '../services/auth.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { HospitalAdminService } from '../services/hospitaladminservice';
import { HospitalService } from 'src/superadmin/services/hospital.service';
import { HospitalAdminGuard } from 'src/guards/hospitaladmin.guard';
import { OperatorDto } from '../dto/operatordto';
import { PatientDto } from '../dto/patientdto';
// import { AuthGuard } from '../services/auth.guard';

@Controller('/hospital-admin')
export class HospitalController {
  constructor(private hospitalAdminService: HospitalAdminService) {}

  // Operators Controller Erros

  @UseGuards(HospitalAdminGuard)
  @Get('/show-operator')
  showDoctors(@Query('id') id: string) {
    if (id) {
      return this.hospitalAdminService.showOperator(id);
    }
    return this.hospitalAdminService.showOperators();
  }

  @UseGuards(HospitalAdminGuard)
  @Post('/add-operator')
  @UsePipes(new ValidationPipe())
  addDoctors(@Body() body: OperatorDto) {
    // console.log(body);
    return this.hospitalAdminService.addOperators(body);
  }

  @UseGuards(AdminGuard)
  @Put('/edit-operators/:id')
  @UsePipes(new ValidationPipe())
  editDoctors(@Body() body: OperatorDto, @Param() param: any) {
    // console.log(body);
    return this.hospitalAdminService.editOperators(param.id, body);
  }

  @UseGuards(HospitalAdminGuard)
  @Delete('/delete-operator/:id')
  deleteDoctors(@Body() body: OperatorDto, @Param() param: any) {
    // console.log(body);
    return this.hospitalAdminService.deleteOperator(param.id);
  }

  // Patient Controller errors

  @UseGuards(HospitalAdminGuard)
  @Get('/show-patient')
  showPatient(@Query('id') id: string) {
    if (id) {
      return this.hospitalAdminService.showPatient(id);
    }
    return this.hospitalAdminService.showPatients();
  }

  @UseGuards(HospitalAdminGuard)
  @Post('/add-patients')
  @UsePipes(new ValidationPipe())
  addPatients(@Body() body: PatientDto) {
    // console.log(body);
    return this.hospitalAdminService.addPatients(body);
  }

  @UseGuards(HospitalAdminGuard)
  @Put('/edit-patients')
  @UsePipes(new ValidationPipe())
  editPatient(@Body() body: PatientDto, @Param() param: any) {
    // console.log(body);
    return this.hospitalAdminService.editPatient(param.id, body);
  }

  @UseGuards(HospitalAdminGuard)
  @Delete('/delete-patient/:id')
  deletePatient(@Param() param: any) {
    // console.log(body);
    return this.hospitalAdminService.deletePatient(param.id);
  }

  // Patients_Records
}
