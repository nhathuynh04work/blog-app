import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dtos/create-user.dto";
import { UserDTO } from "./dtos/user.dto";
import { User } from "./entities/user.entity";
import { hash } from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    mapUserDto(user: User): UserDTO {
        return {
            id: user._id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ email });
    }

    async createUser(data: CreateUserDTO): Promise<User> {
        const { email, password, ...others } = data;

        // Check if email existed
        const existed = await this.findUserByEmail(email);
        if (existed) throw new BadRequestException("Email already registered");

        // Hash the password
        const passwordHash = await hash(password, 10);

        // Save user to database
        const user = this.usersRepository.create({
            email,
            passwordHash,
            ...others,
        });

        return this.usersRepository.save(user);
    }
}
