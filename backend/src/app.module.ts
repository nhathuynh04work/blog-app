import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostsModule } from "./posts/posts.module";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./config/env.validation";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV || "local"}`,
            validationSchema: envSchema,
            expandVariables: true,
        }),
        PostsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
