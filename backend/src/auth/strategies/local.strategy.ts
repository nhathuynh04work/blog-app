import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserDTO } from "src/users/dtos/user.dto";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: "email" });
    }

    async validate(email: string, password: string): Promise<UserDTO> {
        const user = await this.authService.validateUser({ email, password });
        if (!user) throw new UnauthorizedException();

        return user;
    }
}
