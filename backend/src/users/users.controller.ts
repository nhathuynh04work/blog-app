import { Controller, Get, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDTO } from "./dtos/user.dto";
import { PostsService } from "src/posts/posts.service";

@Controller("users")
export class UsersController {
    constructor(
        private usersService: UsersService,
        private postService: PostsService,
    ) {}

    @Get("/me")
    async getMe(@Req() req): Promise<UserDTO> {
        return req.user;
    }
}
