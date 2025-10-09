import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { CreateUserDTO } from "./dtos/create-user.dto";
import { UserDTO } from "./dtos/user.dto";
import { User } from "./entities/user.entity";
import { hash } from "bcrypt";

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
}
