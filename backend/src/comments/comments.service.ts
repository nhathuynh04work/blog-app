import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "./comment.entity";
import { MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";
import { UserDTO } from "src/users/dtos/user.dto";

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentsRepository: MongoRepository<Comment>,
    ) {}

    async create(postId: ObjectId, user: UserDTO, content: string) {
        const comment = this.commentsRepository.create({
            content,
            userId: new ObjectId(user.id),
            author: `${user.firstName} ${user.lastName}`,
            postId,
        });

        return this.commentsRepository.save(comment);
    }
}
