import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dtos/login.dto";
import { UserDTO } from "src/users/dtos/user.dto";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(data: LoginDTO): Promise<UserDTO> {
        const user = await this.authService.validateUser(data);

        if (!user) throw new UnauthorizedException();

        return user;
    }
}
