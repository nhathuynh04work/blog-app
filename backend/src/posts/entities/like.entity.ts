import { ObjectId } from "mongodb";
import { Column, Entity, Index, ObjectIdColumn } from "typeorm";

@Entity("likes")
@Index(["userId", "postId"], { unique: true })
export class Like {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    userId: ObjectId;

    @Column()
    postId: ObjectId;
}
