import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "./comment.entity";
import { MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";
import { UserDTO } from "src/users/dtos/user.dto";
import { CommentDTO } from "./dtos/comment.dto";
import { success } from "zod";

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
}
