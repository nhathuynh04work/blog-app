import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "./comment.entity";
import { MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";
import { UserDTO } from "src/users/dtos/user.dto";
import { CommentDTO } from "./dtos/comment.dto";

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentsRepository: MongoRepository<Comment>,
    ) {}

    private mapToDTO(comment: Comment): CommentDTO {
        return {
            id: comment._id.toString(),
            postId: comment.postId.toString(),
            userId: comment.userId.toString(),
            author: comment.author,
            content: comment.content,
            createdAt: comment.createdAt,
        };
    }

    async create(postId: ObjectId, user: UserDTO, content: string) {
        const comment = this.commentsRepository.create({
            content,
            userId: new ObjectId(user.id),
            author: `${user.firstName} ${user.lastName}`,
            postId,
        });

        const saved = await this.commentsRepository.save(comment);
        return this.mapToDTO(saved);
    }

    async delete(id: ObjectId) {
        const comment = await this.commentsRepository.findOneBy({ _id: id });
        if (!comment) throw new NotFoundException("Comment not found");

        await this.commentsRepository.delete({ _id: id });
        return { success: true };
    }

    async getCommentsByPostId(postId: ObjectId): Promise<CommentDTO[]> {
        const comments = await this.commentsRepository.find({
            where: {
                postId,
            },
            order: {
                createdAt: "ASC",
            },
        });

        return comments.map((c) => this.mapToDTO(c));
    }

    async countCommentsByPostIds(postIds: ObjectId[]) {
        if (!postIds || postIds.length === 0) return [];

        const counts = await this.commentsRepository
            .aggregate([
                { $match: { postId: { $in: postIds } } },
                {
                    $group: {
                        _id: "$postId",
                        count: { $sum: 1 },
                    },
                },
            ])
            .toArray();

        return counts.map((c) => ({
            postId: c._id.toString(),
            count: c.count,
        }));
    }
}
