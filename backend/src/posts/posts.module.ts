import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { LikesModule } from "src/likes/likes.module";
import { CommentsModule } from "src/comments/comments.module";

@Module({
    imports: [TypeOrmModule.forFeature([Post]), LikesModule, CommentsModule],
    controllers: [PostsController],
    providers: [PostsService],
    exports: [PostsService],
})
export class PostsModule {}
