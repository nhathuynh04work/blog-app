import { Module } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Like } from "src/likes/like.entity";
import { LikesController } from "./likes.controller";

@Module({
    providers: [LikesService],
    controllers: [LikesController],
    imports: [TypeOrmModule.forFeature([Like])],
    exports: [LikesService],
})
export class LikesModule {}
