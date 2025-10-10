import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { SignupDTO } from "./dtos/signup.dto";
import { UserDTO } from "src/users/dtos/user.dto";
import { LoginDTO } from "./dtos/login.dto";
import { compare } from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signup(data: SignupDTO): Promise<UserDTO> {
        return await this.usersService.createUser(data);
    }

    async login(data: LoginDTO): Promise<UserDTO> {
        const { email, password } = data;

        const user = await this.usersService.findUserByEmail(email);
        if (!user) throw new UnauthorizedException("User not exist");

        const isPasswordValid = await compare(password, user.passwordHash);
        if (!isPasswordValid)
            throw new UnauthorizedException("Invalid password");

        return this.usersService.mapUserDto(user);
    }
}
