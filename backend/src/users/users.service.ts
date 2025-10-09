import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { CreateUserDTO } from "./dtos/create-user.dto";
import { UserDTO } from "./dtos/user.dto";
import { User } from "./entities/user.entity";
import { hash, compare } from "bcrypt";
import { LoginDTO } from "src/auth/dtos/login.dto";

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    private mapUserDto(user: User): UserDTO {
        return {
            id: user._id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };
    }

    async createUser(data: CreateUserDTO): Promise<UserDTO> {
        const existed = await this.usersRepository.findByEmail(data.email);
        if (existed) throw new BadRequestException("Email already registered");

        const user = new User();
        user.email = data.email;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.passwordHash = await hash(data.password, 10);

        const saved = await this.usersRepository.create(user);
        return this.mapUserDto(saved);
    }

    async authenticate(data: LoginDTO): Promise<UserDTO> {
        const { email, password } = data;

        const user = await this.usersRepository.findByEmail(email);
        if (!user)
            throw new UnauthorizedException(
                "User with this email does not exist",
            );

        const isPasswordValid = await compare(password, user.passwordHash);
        if (!isPasswordValid)
            throw new UnauthorizedException("Password invalid");

        return this.mapUserDto(user);
    }
}
