import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
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
        return await this.postsService.getPosts();
    }

    @Post()
    async createPost(
        @Body(new ZodValidationPipe(CreatePostSchema)) data: CreatePostDTO,
    ): Promise<PostDTO> {
        return await this.postsService.createPost(data);
    }

    @Patch("/:id")
    async updatePost(
        @Param("id", ParseObjectIdPipe) id: ObjectId,
        @Body(new ZodValidationPipe(UpdatePostSchema)) data: UpdatePostDTO,
    ): Promise<PostDTO> {
        return await this.postsService.updatePost(id, data);
    }

    @Delete("/:id")
    async deletePost(
        @Param("id", ParseObjectIdPipe) id: ObjectId,
    ): Promise<void> {
        await this.postsService.deletePost(id);
    }
}
