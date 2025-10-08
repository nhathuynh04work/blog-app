import { Injectable } from "@nestjs/common";
import { Post } from "./entities/post.entity";
import { CreatePostDTO } from "./dtos/create-post.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PostInterface } from "./interfaces/post.interface";

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
    ) {}

    async getPosts(): Promise<PostInterface[]> {
        const posts = await this.postRepository.find();
        return posts.map((p) => this.toInterface(p));
    }

    async createPost(createPostDto: CreatePostDTO): Promise<PostInterface> {
        const newPost = this.postRepository.create(createPostDto);
        const saved = await this.postRepository.save(newPost);
        return this.toInterface(saved);
    }

    private toInterface(post: Post): PostInterface {
        return {
            ...post,
            id: post.id.toString(),
        };
    }
}
