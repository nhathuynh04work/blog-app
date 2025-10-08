import {
    Column,
    CreateDateColumn,
    Entity,
    ObjectId,
    ObjectIdColumn,
} from "typeorm";

@Entity("posts")
export class Post {
    @ObjectIdColumn()
    id: ObjectId;

    @Column("varchar", { length: 200 })
    title: string;

    @Column("text")
    content: string;

    @CreateDateColumn()
    createdAt: Date;
}
