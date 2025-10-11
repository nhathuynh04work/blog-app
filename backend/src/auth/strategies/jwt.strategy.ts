import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayloadDTO } from "../dtos/jwt-payload.dto";
import { Request } from "express";
import { ACCESS_TOKEN_KEY } from "../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        const jwtSecret = configService.get<string>("JWT_SECRET");
        if (!jwtSecret) throw new Error("JWT_SECRET is not defined");

        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    console.log(req?.cookies);
                    return req?.cookies?.[ACCESS_TOKEN_KEY];
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
        });
    }

    validate(payload: JwtPayloadDTO) {
        return { id: payload.sub, email: payload.email };
    }
}
