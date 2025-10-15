import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Req,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { ParseObjectIdPipe } from "src/common/pipes/parse-object-id.pipe";
import { ZodValidationPipe } from "src/common/pipes/zod-validation.pipe";
import {
    type CreateCommentDTO,
    CreateCommentSchema,
} from "./dtos/create-comment.dto";
import { ObjectId } from "mongodb";

@Controller("/comments")
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

    @Delete("/:id") async deleteComment(
        @Param("id", ParseObjectIdPipe) id: ObjectId,
    ) {
        return this.commentsService.delete(id);
    }
}

@Controller("/posts/:postId/comments")
export class PostCommentsController {
    constructor(private commentsService: CommentsService) {}

    @Get()
    async getComments(@Param("postId", ParseObjectIdPipe) postId: ObjectId) {
        return this.commentsService.getCommentsByPostId(postId);
    }

    @Post()
    async addComment(
        @Param("postId", ParseObjectIdPipe) postId: ObjectId,
        @Body(new ZodValidationPipe(CreateCommentSchema))
        data: CreateCommentDTO,
        @Req() req,
    ) {
        return this.commentsService.create(postId, req.user, data.content);
    }
}
