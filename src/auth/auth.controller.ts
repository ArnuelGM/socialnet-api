import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/user/entities/user';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/register')
  async register(@Body() userDto: UserDto) {
    await this.authService.register(userDto);
    return { ok: true };
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() req: Request) {
    return this.authService.login(req['user'] as User);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  logout() {
    // NOTHING TO DO, BECAUSE TOKEN IS SAVED IN CLIENT
    return { ok: true };
  }

  @Get('/refresh')
  refresToken() { }
}
