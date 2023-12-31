import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OperatorGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_Secret'),
      });
      // console.log('PAYLOAD', payload);
      // if (payload.role !== 'operator' || payload.role !== 'hospitaladmin') {
      //   throw new UnauthorizedException('You are not authorized to do this');
      // }
      if (payload.role === 'operator' || payload.role === 'hospital-admin') {
        request['user'] = payload;
      } else {
        throw new UnauthorizedException('You are not authorized to do this');
      }
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
