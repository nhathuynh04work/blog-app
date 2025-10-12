import { Controller, Get, NotFoundException, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDTO } from "./dtos/user.dto";
import { PostsService } from "src/posts/posts.service";
import { PostDTO } from "src/posts/dtos/post.dto";

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

    @Get("/me/posts")
    async getMyPosts(@Req() req): Promise<PostDTO[]> {
        return this.postService.getPostsByUserId(req.user.id);
    }
}
