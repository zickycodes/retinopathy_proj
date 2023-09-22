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
  Request,
  UsePipes,
  ValidationPipe,
  Get,
  Put,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { Hospitaldto } from '../dto/hospital.dto';
import { DoctorService } from '../services/doctor.service';
import { HospitalService } from '../services/hospital.service';

@Controller('/superadmin')
export class SuperAdminHosController {
  constructor(
    private doctorService: DoctorService,
    private hospitalService: HospitalService,
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
  addHospital(@Body() body: Hospitaldto) {
    // console.log(body);
    return this.hospitalService.addHospital(body);
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
