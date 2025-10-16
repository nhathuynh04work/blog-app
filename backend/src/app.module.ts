import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostsModule } from "./posts/posts.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { validate } from "./config/env.validation";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./posts/entities/post.entity";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { User } from "./users/entities/user.entity";
import { Like } from "./likes/like.entity";
import { LikesModule } from "./likes/likes.module";
import { CommentsModule } from "./comments/comments.module";
import { Comment } from "./comments/comment.entity";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ".env",
            validate,
            expandVariables: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "mongodb",
                url: configService.get<string>("MONGO_URI"),
                database: configService.get<string>("DB_NAME"),
                synchronize: true,
                entities: [Post, User, Like, Comment],
            }),
        }),
        PostsModule,
        AuthModule,
        UsersModule,
        LikesModule,
        CommentsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
