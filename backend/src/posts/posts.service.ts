import { Injectable, NotFoundException } from "@nestjs/common";
import { Post } from "./entities/post.entity";
import { CreatePostDTO } from "./dtos/create-post.dto";
import { PostDTO } from "./dtos/post.dto";
import { UpdatePostDTO } from "./dtos/update-post.dto";
import { ObjectId } from "mongodb";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,
    ) {}

    private mapPostDTO(post: Post): PostDTO {
        return {
            id: post._id.toString(),
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
        };
    }

    async getPostsByUserId(userId: string): Promise<PostDTO[]> {
        const posts = await this.postsRepository.find({
            where: {
                userId: new ObjectId(userId),
            },
        });

        return posts.map((post) => this.mapPostDTO(post));
    }

    async createPost(data: CreatePostDTO): Promise<PostDTO> {
        const newPost = this.postsRepository.create(data);
        const saved = await this.postsRepository.save(newPost);
        return this.mapPostDTO(saved);
    }

    async updatePost(id: ObjectId, data: UpdatePostDTO): Promise<PostDTO> {
        const post = await this.postsRepository.findOneBy({ _id: id });
        if (!post) throw new NotFoundException("Post not found");

        Object.assign(post, data);
        await this.postsRepository.save(post);
        return this.mapPostDTO(post);
    }

    async deletePost(id: ObjectId): Promise<void> {
        const post = await this.postsRepository.findOneBy({ _id: id });
        if (!post) throw new NotFoundException("Post not found");

        await this.postsRepository.delete({ _id: id });
    }
}
