import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { ZodValidationPipe } from "src/common/pipes/zod-validation.pipe";
import { type CreatePostDTO, CreatePostSchema } from "./dtos/create-post.dto";
import { PostDTO } from "./dtos/post.dto";
import { UpdatePostSchema, type UpdatePostDTO } from "./dtos/update-post.dto";
import { ParseObjectIdPipe } from "src/common/pipes/parse-object-id.pipe";
import { ObjectId } from "mongodb";

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

    @Patch("/:id")
    async updatePost(
        @Param("id", ParseObjectIdPipe) id: ObjectId,
        @Body(new ZodValidationPipe(UpdatePostSchema)) data: UpdatePostDTO,
    ): Promise<PostDTO> {
        const updated = await this.postsService.updatePost(id, data);
        return updated;
    }
}
