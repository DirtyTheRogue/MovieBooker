import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { MoviesModule } from './movies/movies.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReservationModule } from './reservation/reservation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { Reservation } from './reservation/reservation.entity';
import { User } from './user/user.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      url: configService.get('DATABASE_URL'), 
      autoLoadEntities: true,
      entities: [User, Reservation],
      synchronize: true,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'), 
      signOptions: { expiresIn: '1h' },
      }),
    }),
    MoviesModule,
    ReservationModule,
    UserModule,
  ],
  controllers: [AppController], 
  providers: [JwtStrategy],
})
export class AppModule {}
