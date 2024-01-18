import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as config from "config";
import { IPayload } from "./interface/payload.interface";
import { AuthService } from "./auth.service";

const jwtConfig = config.get('jwt');
const secretOrKey: string = process.env.JWT_SECRET || jwtConfig.secret;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey,
        })
    }

    async validate(payload: IPayload): Promise<any> {
        const account = await this.authService.tokenValidateAccount(payload);
        return account;
    }
}