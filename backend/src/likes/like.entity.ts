import { ObjectId } from "mongodb";
import type { EntityType } from "src/common/enums/entity-type.enum";
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    ObjectIdColumn,
} from "typeorm";

@Entity("likes")
@Index(["entityType", "userId", "entityId"], { unique: true })
export class Like {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    entityType: EntityType;

    @Column()
    userId: ObjectId;

    @Column()
    entityId: ObjectId;

    @CreateDateColumn()
    createdAt: Date;
}
