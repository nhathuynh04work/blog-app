import { Injectable, NotFoundException } from "@nestjs/common";
import { Post } from "./entities/post.entity";
import { CreatePostDTO } from "./dtos/create-post.dto";
import { PostDTO } from "./dtos/post.dto";
import { UpdatePostDTO } from "./dtos/update-post.dto";
import { ObjectId } from "mongodb";
import { PostsRepository } from "./posts.repository";

@Injectable()
export class PostsService {
    constructor(private postRepository: PostsRepository) {}

    private mapPostDTO(post: Post): PostDTO {
        return {
            ...post,
            id: post._id.toString(),
        };
    }

    async getPosts(): Promise<PostDTO[]> {
        const posts = await this.postRepository.findAll();
        return posts.map((p) => this.mapPostDTO(p));
    }

    async createPost(data: CreatePostDTO): Promise<PostDTO> {
        const newPost = await this.postRepository.create(data);
        return this.mapPostDTO(newPost);
    }

    async updatePost(id: ObjectId, data: UpdatePostDTO): Promise<PostDTO> {
        const post = await this.postRepository.findById(id);

        if (!post) throw new NotFoundException("Post not found");

        const updated = await this.postRepository.update(post, data);
        return this.mapPostDTO(updated);
    }
}
