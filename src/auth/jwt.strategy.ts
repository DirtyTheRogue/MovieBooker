import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET') || 'fallback-secret', //https://stackoverflow.com/questions/72831836/secretorprivatekey-must-have-a-value-nestjs
    });
  }

  async validate(payload: any) {
    console.log('Payload validé : ', payload);
    return { id: payload.sub, username: payload.username };
  }
}
