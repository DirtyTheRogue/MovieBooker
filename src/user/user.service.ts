import { Injectable, BadRequestException } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, password } = registerDto;

    const existing = await this.userRepository.findOne({ where: { username } });
    if (existing) throw new BadRequestException('Cet utilisateur existe déjà');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ username, password: hashedPassword });
    await this.userRepository.save(user);

    return { message: 'Inscription réussie' };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) throw new BadRequestException('Utilisateur non trouvé');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new BadRequestException('Mot de passe incorrect');

    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
