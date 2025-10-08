import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostsModule } from "./posts/posts.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { envSchema } from "./config/env.validation";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./posts/entities/post.entity";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV || "local"}`,
            validationSchema: envSchema,
            expandVariables: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: "mongodb",
                url: configService.get<string>("MONGO_URI"),
                database: configService.get<string>("DB_NAME"),
                synchronize: true,
                entities: [Post],
            }),
        }),
        PostsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
