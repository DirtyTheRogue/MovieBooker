import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'Adresse email' })
  @IsEmail({}, { message: 'Le champ doit être une adresse email' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Mot de passe' })
  @IsNotEmpty()
  password: string;
}
