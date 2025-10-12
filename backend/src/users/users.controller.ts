import {
    Controller,
    Get,
    NotFoundException,
    Req,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDTO } from "./dtos/user.dto";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get("/me")
    async getMe(@Req() req): Promise<UserDTO> {
        const user = await this.usersService.findUserByEmail(req.user.email);
        if (!user) throw new NotFoundException("User not found");

        return this.usersService.mapUserDto(user);
    }
}
