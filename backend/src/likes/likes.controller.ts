import { Body, Controller, Patch, Req } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { ObjectId } from "mongodb";
import { ZodValidationPipe } from "src/common/pipes/zod-validation.pipe";
import { type ToggleLikeDTO, ToggleLikeSchema } from "./toggle-like.dto";

@Controller("likes")
export class LikesController {
    constructor(private likesService: LikesService) {}

    @Patch()
    async toggleLike(
        @Req() req,
        @Body(new ZodValidationPipe(ToggleLikeSchema)) data: ToggleLikeDTO,
    ) {
        const userId = new ObjectId(req.user.id);
        const entityId = new ObjectId(data.entityId);

        return this.likesService.toggleLike(data.entityType, userId, entityId);
    }
}
