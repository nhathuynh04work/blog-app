import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectId } from "mongodb";
import { type EntityType } from "src/common/enums/entity-type.enum";
import { Like } from "src/likes/like.entity";
import { MongoRepository } from "typeorm";

export type LikeSummary = {
    entityId: string;
    likeCount: number;
    likedByCurrentUser: boolean;
};

@Injectable()
export class LikesService {
    constructor(
        @InjectRepository(Like)
        private readonly likesRepository: MongoRepository<Like>,
    ) {}

    async toggleLike(
        entityType: EntityType,
        userId: ObjectId,
        entityId: ObjectId,
    ) {
        const existing = await this.likesRepository.findOne({
            where: { entityType, entityId, userId },
        });

        if (existing) {
            await this.likesRepository.delete({ entityType, entityId, userId });
            return { liked: false };
        }

        const like = this.likesRepository.create({
            entityType,
            entityId,
            userId,
        });
        await this.likesRepository.save(like);
        return { liked: true };
    }

    async getLikeSummary(
        entityType: EntityType,
        entityIds: ObjectId[],
        currentUserId: ObjectId,
    ): Promise<LikeSummary[]> {
        const likes = await this.likesRepository
            .aggregate([
                {
                    $match: {
                        entityType,
                        entityId: { $in: entityIds },
                    },
                },
                {
                    $group: {
                        _id: "$entityId",
                        likeCount: { $sum: 1 },
                        likedByCurrentUser: {
                            $addToSet: {
                                $cond: [
                                    { $eq: ["$userId", currentUserId] },
                                    "$userId",
                                    "$$REMOVE",
                                ],
                            },
                        },
                    },
                },
            ])
            .toArray();

        return likes.map((l) => ({
            entityId: l._id.toString(),
            likeCount: l.likeCount,
            likedByCurrentUser: l.likedByCurrentUser.length > 0,
        }));
    }

    toMap(likeSummaries: LikeSummary[]): Map<string, LikeSummary> {
        return new Map(likeSummaries.map((l) => [l.entityId, l]));
    }
}
