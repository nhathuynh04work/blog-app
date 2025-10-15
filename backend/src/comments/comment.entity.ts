import { ObjectId } from "mongodb";
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";

@Entity("comments")
export class Comment {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    userId: ObjectId;

    @Column()
    author: string;

    @Column()
    postId: ObjectId;

    @Column()
    content: string;

    @CreateDateColumn()
    createdAt: Date;
}
