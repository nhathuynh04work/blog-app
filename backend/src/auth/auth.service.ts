import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { SignupDTO } from "./dtos/signup.dto";
import { UserDTO } from "src/users/dtos/user.dto";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signup(data: SignupDTO): Promise<UserDTO> {
        return await this.usersService.createUser(data);
    }
}
