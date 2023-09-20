import {
  Body,
  Controller,
  Post,
  // Put,
  // UseGuards,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';

import { SignUpDto } from '../dto/signupdto';
import { LoginDto } from '../dto/logindto';
import { AuthService } from '../services/auth.service';
import { AdminGuard } from 'src/guards/admin.guard';
// import { AuthGuard } from '../services/auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login/:identity/')
  @UsePipes(new ValidationPipe())
  login(@Body() dto: LoginDto, @Param() params) {
    // console.log(dto);
    // console.log(params.identity);
    return this.authService.login(dto, params.identity);
  }

  @Post('/signup/:identity')
  @UsePipes(new ValidationPipe())
  signUp(@Body() dto: SignUpDto, @Param() params): any {
    return this.authService.signup(dto, params.identity);
  }

  @UseGuards(AdminGuard)
  @Get('profile')
  getProfile(@Request() req) {
    // console.log(req.user);
    return 'hfyue';
  }
}
