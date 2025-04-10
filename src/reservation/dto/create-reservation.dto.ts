import { IsDateString, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({ example: 950387, description: 'ID du film TMDb' })
  @IsInt()
  movieId: number;

  @ApiProperty({ example: '2025-04-10T18:00:00.000Z', description: 'Heure de début de la séance' })
  @IsDateString()
  startTime: string; 


}
