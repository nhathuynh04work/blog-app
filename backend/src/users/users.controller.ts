import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserSchema, type CreateUserDTO } from "./dtos/create-user.dto";
import { UserDTO } from "./dtos/user.dto";
import { UsersService } from "./users.service";
import { ZodValidationPipe } from "src/common/pipes/zod-validation.pipe";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    async createUser(
        @Body(new ZodValidationPipe(CreateUserSchema)) data: CreateUserDTO,
    ): Promise<UserDTO> {
        return this.usersService.createUser(data);
    }
}
