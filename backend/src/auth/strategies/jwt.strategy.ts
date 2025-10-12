import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayloadDTO } from "../dtos/jwt-payload.dto";
import { Request } from "express";
import { ACCESS_TOKEN_KEY } from "../constants";
import { UsersService } from "src/users/users.service";
import { UserDTO } from "src/users/dtos/user.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private usersService: UsersService,
    ) {
        const jwtSecret = configService.get<string>("JWT_SECRET");
        if (!jwtSecret) throw new Error("JWT_SECRET is not defined");

        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => req?.cookies?.[ACCESS_TOKEN_KEY],
            ]),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
        });
    }

    async validate(payload: JwtPayloadDTO): Promise<UserDTO> {
        const user = await this.usersService.findUserByEmail(payload.email);
        if (!user) throw new UnauthorizedException();

        return this.usersService.mapUserDto(user);
    }
}
