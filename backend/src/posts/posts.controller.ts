import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
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
    async getPosts(@Req() req) {
        return this.postsService.getPostsWithLikes(req.user.id);
    }

    @Post()
    async createPost(
        @Body(new ZodValidationPipe(CreatePostSchema)) data: CreatePostDTO,
        @Req() req,
    ): Promise<PostDTO> {
        return this.postsService.createPost(data, req.user);
    }

    @Patch("/:id")
    async updatePost(
        @Param("id", ParseObjectIdPipe) id: ObjectId,
        @Body(new ZodValidationPipe(UpdatePostSchema)) data: UpdatePostDTO,
        @Req() req,
    ): Promise<PostDTO> {
        return this.postsService.updatePost(id, data, req.user.id);
    }

    @Delete("/:id")
    async deletePost(
        @Param("id", ParseObjectIdPipe) id: ObjectId,
        @Req() req,
    ): Promise<void> {
        this.postsService.deletePost(id, req.user.id);
    }

    @Post("/:id/likes")
    async likePost(
        @Param("id", ParseObjectIdPipe) postId: ObjectId,
        @Req() req,
    ): Promise<void> {
        await this.postsService.likePost(new ObjectId(req.user.id), postId);
    }

    @Delete("/:id/likes")
    async unlikePost(
        @Param("id", ParseObjectIdPipe) postId: ObjectId,
        @Req() req,
    ): Promise<void> {
        await this.postsService.unlikePost(new ObjectId(req.user.id), postId);
    }
}
