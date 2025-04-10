import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation,} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Inscription utilisateur' })
  register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Connexion utilisateur' })
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Accès à une route protégée (JWT)' })
  protectedRoute(@Request() req) {
    return {
      message: 'Accès autorisé à la route protégée ',
      user: req.user,
    };
  }
}
