import {
  Body,
  Controller,
  Post,
  Query,
  Param,
  Delete,
  // Put,
  // UseGuards,
  //   UsePipes,
  //   ValidationPipe,
  //   Get,
  //   Param,
  UseGuards,
  // Request,
  UsePipes,
  ValidationPipe,
  Get,
  Put,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { Hospitaldto } from '../dto/hospital.dto';
import { DoctorService } from '../services/doctor.service';
import { HospitalService } from '../services/hospital.service';
// import { OperatorService } from 'src/hospital/services/operator.service';

@Controller('/superadmin')
export class SuperAdminHosController {
  constructor(
    private doctorService: DoctorService,
    private hospitalService: HospitalService, // private operatorService: OperatorService,
  ) {}

  @UseGuards(AdminGuard)
  @Get('/gethospital')
  showHospital(@Query('id') id: string) {
    if (id) {
      return this.hospitalService.showHospital(id);
    }
    return this.hospitalService.showHospitals();
  }

  @UseGuards(AdminGuard)
  @Post('/add-hospital')
  @UsePipes(new ValidationPipe())
  addHospital(@Body() body: any) {
    const operator = {
      first_name: body.first_name,
      last_name: body.last_name,
      phone_no: body.admin_contact_info,
      password: body.password,
      email: body.email,
    };
    const hospital = {
      name: body.name,
      address: body.address,
      state: body.state,
      email: body.email,
      admin_contact_info: body.admin_contact_info,
      password: body.password,
    };
    return this.hospitalService.addHospital(hospital, operator);
  }

  @UseGuards(AdminGuard)
  @Put('/edit-hospital/:id')
  @UsePipes(new ValidationPipe())
  editHospital(@Body() body: Hospitaldto, @Param() param: any) {
    // console.log(body);
    return this.hospitalService.editHospital(param.id, body);
  }

  @UseGuards(AdminGuard)
  @Delete('/delete-hospital/:id')
  deleteHospital(@Body() body: Hospitaldto, @Param() param: any) {
    // console.log(body);
    return this.hospitalService.deleteHospital(param.id);
  }
}
