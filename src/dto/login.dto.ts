import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Adresse email de connexion', example: "test@mail.com", name : "email" })
  @IsEmail({}, { message: 'Le champ doit être une adresse email' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Mot de passe' })
  @IsNotEmpty()
  password: string;
}
