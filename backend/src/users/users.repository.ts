import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) {}

    async findByEmail(email: string): Promise<User | null> {
        return this.repo.findOneBy({ email });
    }

    async create(data: User): Promise<User> {
        const user = this.repo.create(data);
        return await this.repo.save(user);
    }
}
