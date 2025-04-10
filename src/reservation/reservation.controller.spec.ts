// import { ReservationController } from './reservation.controller';
// import { ReservationService } from './reservation.service';
// import { User } from '../user/user.entity';
// import { Test, TestingModule } from '@nestjs/testing';


// describe('ReservationController', () => {
//   let controller: ReservationController;
//   let service: Partial<ReservationService>;

//   beforeEach(async () => {
//     service = {
//       createReservation: jest.fn().mockResolvedValue({
//         id: 1,
//         movieTitle: 'ma vie mon oeuvre charles mangin',
//       }),
//     };

//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [ReservationController],
//       providers: [{ provide: ReservationService, useValue: service }],
//     }).compile();

//     controller = module.get<ReservationController>(ReservationController);
//   });

//   it('devrait appeler createReservation depuis le controller', async () => {
//     const dto = { movieId: 123, startTime: '2025-04-10T14:00:00' };
//     const user = { id: 1, username: 'test' } as User;

//     const result = await controller.create(dto, user);
//     expect(result.movieTitle).toBe('Fake Movie');
//     expect(service.createReservation).toHaveBeenCalledWith(user, dto);
//   });
// });
