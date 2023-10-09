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
import { EditHospitaldto } from '../dto/edithospital.dto';
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
    // console.log(body);
    const operator = {
      o_first_name: body.h_first_name,
      o_last_name: body.h_last_name,
      o_phone_no: body.h_admin_contact_info,
      o_password: body.h_password,
      o_email: body.h_email,
    };
    const hospital = {
      h_name: body.h_name,
      h_address: body.h_address,
      h_state: body.h_state,
      h_email: body.h_email,
      h_admin_contact_info: body.h_admin_contact_info,
      h_password: body.h_password,
    };
    return this.hospitalService.addHospital(hospital, operator);
  }

  @UseGuards(AdminGuard)
  @Put('/edit-hospital/:id')
  @UsePipes(new ValidationPipe())
  editHospital(@Body() body: EditHospitaldto, @Param() param: any) {
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
