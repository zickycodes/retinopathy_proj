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
// import { AuthGuard } from 'src/auth/services/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { Doctordto } from '../dto/doctor.dto';
import { Hospitaldto } from '../dto/hospital.dto';
import { DoctorService } from '../services/doctor.service';
import { HospitalService } from '../services/hospital.service';

@Controller('/superadmin')
export class SuperAdminDocController {
  constructor(
    private doctorService: DoctorService,
    private hospitalService: HospitalService,
  ) {}

  @UseGuards(AdminGuard)
  @Get('/showdoctors')
  showDoctors(@Query('id') id: string) {
    if (id) {
      return this.doctorService.showDoctor(id);
    }
    return this.doctorService.showDoctors();
  }

  // @UseGuards(AdminGuard)
  // @Get('/showdoctors/:id')
  // showDoctor() {
  //   return this.doctorService.showDoctor();
  // }

  @UseGuards(AdminGuard)
  @Post('/add-doctors')
  @UsePipes(new ValidationPipe())
  addDoctors(@Body() body: Doctordto) {
    // console.log(body);
    return this.doctorService.addDoctors(body);
  }

  @UseGuards(AdminGuard)
  @Put('/edit-doctors/:id')
  @UsePipes(new ValidationPipe())
  editDoctors(@Body() body: Doctordto, @Param() param: any) {
    // console.log(body);
    return this.doctorService.editDoctors(param.id, body);
  }

  @UseGuards(AdminGuard)
  @Delete('/delete-doctor/:id')
  deleteDoctors(@Body() body: Doctordto, @Param() param: any) {
    // console.log(body);
    return this.doctorService.deleteDoctor(param.id);
  }
}
