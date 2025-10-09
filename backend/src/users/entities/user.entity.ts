import { ObjectId } from "mongodb";
import {
    Column,
    CreateDateColumn,
    Entity,
    ObjectIdColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({ unique: true })
    email: string;

    @Column()
    passwordHash: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @UpdateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}
