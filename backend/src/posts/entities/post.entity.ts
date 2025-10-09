import { ObjectId } from "mongodb";
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";

@Entity("posts")
export class Post {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column("varchar", { length: 200 })
    title: string;

    @Column("text")
    content: string;

    @CreateDateColumn()
    createdAt: Date;
}
