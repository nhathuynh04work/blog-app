import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { Post } from "./entities/post.entity";
import { CreatePostDTO } from "./dtos/create-post.dto";
import { PostDTO } from "./dtos/post.dto";
import { UpdatePostDTO } from "./dtos/update-post.dto";
import { ObjectId } from "mongodb";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDTO } from "src/users/dtos/user.dto";

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
            userId: post.userId.toString(),
            author: post.author,
        };
    }

    async getPosts(): Promise<PostDTO[]> {
        const posts = await this.postsRepository.find();
        return posts.map((post) => this.mapPostDTO(post));
    }

    async getPostsByUserId(userId: string): Promise<PostDTO[]> {
        const posts = await this.postsRepository.find({
            where: {
                userId: new ObjectId(userId),
            },
        });

        return posts.map((post) => this.mapPostDTO(post));
    }

    async createPost(data: CreatePostDTO, user: UserDTO): Promise<PostDTO> {
        const newPost = this.postsRepository.create({
            ...data,
            userId: new ObjectId(user.id),
            author: `${user.firstName} ${user.lastName}`,
        });
        const saved = await this.postsRepository.save(newPost);
        return this.mapPostDTO(saved);
    }

    async updatePost(
        id: ObjectId,
        data: UpdatePostDTO,
        userId: string,
    ): Promise<PostDTO> {
        const post = await this.postsRepository.findOneBy({ _id: id });
        if (!post) throw new NotFoundException("Post not found");

        if (!post.userId.equals(new ObjectId(userId)))
            throw new ForbiddenException("Cannot edit this post");

        Object.assign(post, data);
        const saved = await this.postsRepository.save(post);
        return this.mapPostDTO(saved);
    }

    async deletePost(id: ObjectId, userId: string): Promise<void> {
        const post = await this.postsRepository.findOneBy({ _id: id });
        if (!post) throw new NotFoundException("Post not found");

        if (!post.userId.equals(new ObjectId(userId)))
            throw new ForbiddenException("Cannot delete this post");

        await this.postsRepository.delete({ _id: id });
    }
}
