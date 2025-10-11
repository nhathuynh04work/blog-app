import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { SignupDTO } from "./dtos/signup.dto";
import { UserDTO } from "src/users/dtos/user.dto";
import { LoginDTO } from "./dtos/login.dto";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { JwtPayloadDTO } from "./dtos/jwt-payload.dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signup(data: SignupDTO): Promise<UserDTO> {
        const user = await this.usersService.createUser(data);
        return this.usersService.mapUserDto(user);
    }

    async validateUser(data: LoginDTO): Promise<UserDTO> {
        const { email, password } = data;

        const user = await this.usersService.findUserByEmail(email);
        if (!user) throw new UnauthorizedException();

        const isPasswordValid = await compare(password, user.passwordHash);
        if (!isPasswordValid) throw new UnauthorizedException();

        return this.usersService.mapUserDto(user);
    }

    async login(user: UserDTO): Promise<string> {
        const payload: JwtPayloadDTO = { sub: user.id, email: user.email };
        return this.jwtService.sign(payload);
    }
}
