import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let userRepo: Partial<Record<keyof Repository<User>, jest.Mock>>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    userRepo = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('fake-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: userRepo },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('devrait connecter un utilisateur valide et retourner un token', async () => {
    const dto = { username: 'testuser', password: 'password123' };
    const user = { id: 1, username: dto.username, password: 'hashedpass' };
  
    (userRepo.findOne as jest.Mock).mockResolvedValue(user);
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
    jest.spyOn(jwtService, 'sign').mockReturnValue('test-token');
  
    const result = await service.login(dto);
  
    expect(userRepo.findOne).toHaveBeenCalledWith({ where: { username: dto.username } });
    expect(bcrypt.compare).toHaveBeenCalledWith(dto.password, user.password);
    expect(result).toEqual({ access_token: 'test-token' });
  });
  

  it('devrait inscrire un utilisateur si le nom est dispo', async () => {
    const dto = { username: 'test', password: 'test' };

    (userRepo.findOne as jest.Mock).mockResolvedValue(null);
    (userRepo.create as jest.Mock).mockReturnValue({ id: 1, ...dto });
    (userRepo.save as jest.Mock).mockResolvedValue(undefined);
    jest.spyOn(bcrypt, 'hash')
    .mockResolvedValue(Promise.resolve('hashed') as unknown as never);
    const result = await service.register(dto);

    expect(result).toEqual({ message: 'Inscription réussie' });
    expect(userRepo.findOne).toHaveBeenCalledWith({ where: { username: dto.username } });
    expect(userRepo.create).toHaveBeenCalledWith({ username: dto.username, password: 'hashed' });
  });
});
