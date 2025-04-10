import {
    Controller,
    Post,
    Body,
    Get,
    UseGuards,
    Delete,
    Param,
    Request,
    ParseIntPipe,
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { ReservationService } from './reservation.service';
  import { CreateReservationDto } from './dto/create-reservation.dto';
  
  @ApiTags('Reservations')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Controller('reservations')
  export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}
  
    @Post()
    @ApiOperation({ summary: 'Créer une réservation' })
    @ApiBody({ type: CreateReservationDto })
    create(@Body() dto: CreateReservationDto, @Request() req) {
      return this.reservationService.createReservation(req.user.id, dto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Lister les réservations de l’utilisateur connecté' })
    findAll(@Request() req) {
      return this.reservationService.findAll(req.user);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Annuler une réservation par son ID' })
    remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
      return this.reservationService.remove(id, req.user);
    }
  }
  