import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { readonly } from "zod";
import { Repository } from "typeorm";
import { ObjectId } from "mongodb";
import { CreatePostDTO } from "./dtos/create-post.dto";
import { UpdatePostDTO } from "./dtos/update-post.dto";

@Injectable()
export class PostsRepository {
    constructor(
        @InjectRepository(Post)
        readonly repo: Repository<Post>,
    ) {}

    async findAll() {
        return this.repo.find();
    }

    async findById(id: ObjectId) {
        return this.repo.findOneBy({ _id: id });
    }

    async create(data: CreatePostDTO) {
        const post = this.repo.create(data);
        return this.repo.save(post);
    }

    async update(post: Post, data: UpdatePostDTO) {
        Object.assign(post, data);
        return this.repo.save(post);
    }
}
