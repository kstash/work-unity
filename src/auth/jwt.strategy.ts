import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IPayload } from './interface/payload.interface';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { ProfileAccount } from './interface/profileAccount.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: IPayload): Promise<ProfileAccount> {
    const profileAccount = await this.authService.tokenValidate(payload);
    return profileAccount;
  }
}
