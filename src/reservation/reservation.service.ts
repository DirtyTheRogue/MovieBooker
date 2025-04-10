import {
    Injectable,
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Between, Repository } from 'typeorm';
  import { Reservation } from './reservation.entity';
  import { CreateReservationDto } from './dto/create-reservation.dto';
  import { User } from 'src/user/user.entity';
  import { HttpService } from '@nestjs/axios';
  import { ConfigService } from '@nestjs/config';
  import { firstValueFrom } from 'rxjs';
  
  @Injectable()
  export class ReservationService {
    constructor(
      @InjectRepository(Reservation)
      private reservationRepo: Repository<Reservation>,
      private readonly httpService: HttpService,
      private readonly configService: ConfigService,
    ) {}
  
    async create(createDto: CreateReservationDto, user: User) {
      const start = new Date(createDto.startTime);
      const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  
      const conflict = await this.reservationRepo.findOne({
        where: {
          user: { id: user.id },
          startTime: Between(new Date(start.getTime() - 2 * 60 * 60 * 1000), end),
        },
      });
  
      if (conflict) {
        throw new BadRequestException(
          'Tu as déjà une réservation dans cette plage horaire. Il faut espacer de au moins 2h',
        );
      }
  
      const reservation = this.reservationRepo.create({
        movieId: createDto.movieId,
        startTime: start,
        user,
      });
  
      return this.reservationRepo.save(reservation);
    }
  
    async createReservation(userId: number, dto: CreateReservationDto) {
      const start = new Date(dto.startTime);
      const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  
      if (!userId) {
        throw new BadRequestException('Utilisateur non authentifié ou ID manquant');
      }
  
      console.log('Tentative de création de réservation :', {
        userId,
        movieId: dto.movieId,
        startTime: dto.startTime,
        parsedStart: start.toISOString(),
        parsedEnd: end.toISOString(),
      });
  
      const conflict = await this.reservationRepo.findOne({
        where: {
          user: { id: userId },
          startTime: Between(new Date(start.getTime() - 2 * 60 * 60 * 1000), end),
        },
      });
  
      if (conflict) {
        throw new ConflictException('Conflit de réservation : 2h dintervalle requis.');
      }
  
      let movieTitle = '';
      try {
        const apiKey = this.configService.get('TMDB_API_KEY');
        const tmdbUrl = `${this.configService.get('TMDB_BASE_URL')}/movie/${dto.movieId}`;
        const response = await firstValueFrom(
          this.httpService.get(tmdbUrl, {
            params: { api_key: apiKey },
          }),
        );
        movieTitle = response.data.title;
      } catch (err) {
        console.error('Erreur lors de la récupération du titre du film :', err);
        throw new InternalServerErrorException("Impossible d'obtenir les infos du film.");
      }
  
      const reservation = this.reservationRepo.create({
        movieId: dto.movieId,
        movieTitle,
        startTime: start,
        endTime: end,
        user: { id: userId },
      });
  
      return this.reservationRepo.save(reservation);
    }
  
    async findAll(user: User) {
      return this.reservationRepo.find({
        where: { user: { id: user.id } },
        order: { startTime: 'ASC' },
      });
    }
  
    async remove(id: number, user: User) {
      const res = await this.reservationRepo.findOne({
        where: { id, user: { id: user.id } },
      });
      if (!res) throw new BadRequestException('Réservation non trouvée ou non autorisée.');
      return this.reservationRepo.remove(res);
    }
  }
  