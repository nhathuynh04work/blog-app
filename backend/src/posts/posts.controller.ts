import { Body, Controller, Get, Post } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { ZodValidationPipe } from "src/common/pipes/zod-validation.pipe";
import { type CreatePostDTO, CreatePostSchema } from "./dtos/create-post.dto";
import { PostDTO } from "./dtos/post.dto";

@Controller("posts")
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    async getPosts(): Promise<PostDTO[]> {
        const posts = await this.postsService.getPosts();
        return posts;
    }

    @Post()
    async createPost(
        @Body(new ZodValidationPipe(CreatePostSchema)) data: CreatePostDTO,
    ): Promise<PostDTO> {
        const newPost = await this.postsService.createPost(data);
        return newPost;
    }
}
