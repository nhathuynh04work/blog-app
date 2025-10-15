import { Module } from "@nestjs/common";
import {
    CommentsController,
    PostCommentsController,
} from "./comments.controller";
import { CommentsService } from "./comments.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./comment.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Comment])],
    controllers: [CommentsController, PostCommentsController],
    providers: [CommentsService],
})
export class CommentsModule {}
