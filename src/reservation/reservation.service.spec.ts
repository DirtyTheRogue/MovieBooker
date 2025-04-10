import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { HttpService } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';
import { of } from 'rxjs';
import { User } from '../user/user.entity';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';


describe('ReservationService', () => {
  let service: ReservationService;
  let reservationRepo: any;
  let httpService: HttpService;

  beforeEach(async () => {
    reservationRepo = {
      find: jest.fn(),
      save: jest.fn(),
    };

    httpService = {
      get: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        { provide: getRepositoryToken(Reservation), useValue: reservationRepo },
        { provide: HttpService, useValue: httpService },
        { provide: ConfigService, useValue: { get: jest.fn().mockReturnValue('http://urlcaca') } },],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
  });

  it('devrait créer une réservation valide', async () => {
    const user = { id: 1, username: 'testuser' } as User;
    const dto = {
      movieId: 123,
      startTime: '2025-04-10T14:00:00',
    };

    reservationRepo.find.mockResolvedValue([]);
    reservationRepo.save.mockResolvedValue({ id: 1, ...dto, user });

    jest.spyOn(httpService, 'get').mockReturnValue(
      of({
        data: { title: 'doctor who house' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      }as AxiosResponse)
    );

    const result = await service.createReservation(user.id, dto);
    expect(result.movieTitle).toBe('doctor who house');
    expect(reservationRepo.save).toHaveBeenCalled();
  });

  it('devrait refuser une réservation avec un chevauchement', async () => {
    const user = { id: 1, username: 'testuser' } as User;
    const dto = {
      movieId: 123,
      startTime: '2025-04-10T14:00:00',
    };

    reservationRepo.find.mockResolvedValue([{ id: 1 }]); 

    await expect(service.createReservation(user.id, dto)).rejects.toThrow(BadRequestException);
  });
});
