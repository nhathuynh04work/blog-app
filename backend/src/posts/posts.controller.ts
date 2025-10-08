import { Body, Controller, Get, Post } from "@nestjs/common";
import { PostsService } from "./posts.service";
import type { PostInterface } from "./interfaces/post.interface";
import { ZodValidationPipe } from "src/common/pipes/zod-validation.pipe";
import { type CreatePostDTO, CreatePostSchema } from "./dtos/create-post.dto";

@Controller("posts")
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    async getPosts(): Promise<PostInterface[]> {
        const posts = await this.postsService.getPosts();
        return posts;
    }

    @Post()
    async createPost(
        @Body(new ZodValidationPipe(CreatePostSchema)) data: CreatePostDTO,
    ): Promise<PostInterface> {
        const newPost = await this.postsService.createPost(data);
        return newPost;
    }
}
