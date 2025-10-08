import { Body, Controller, Get, Post } from "@nestjs/common";
import { PostsService } from "./posts.service";
import type { Post as PostInterface } from "./interfaces/post.interface";
import { ZodValidationPipe } from "src/common/pipes/zod-validation.pipe";
import { type CreatePostDTO, CreatePostSchema } from "./dtos/create-post.dto";

@Controller("posts")
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    getPosts(): PostInterface[] {
        const posts: PostInterface[] = this.postsService.getPosts();
        return posts;
    }

    @Post()
    createPost(
        @Body(new ZodValidationPipe(CreatePostSchema)) data: CreatePostDTO,
    ): PostInterface {
        const newPost = this.postsService.createPost(data);
        return newPost;
    }
}
