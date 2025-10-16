import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { Post } from "./entities/post.entity";
import { CreatePostDTO } from "./dtos/create-post.dto";
import { PostDTO, PostWithSummary } from "./dtos/post.dto";
import { UpdatePostDTO } from "./dtos/update-post.dto";
import { ObjectId } from "mongodb";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { UserDTO } from "src/users/dtos/user.dto";
import { LikesService, LikeSummary } from "src/likes/likes.service";
import { EntityType } from "src/common/enums/entity-type.enum";
import { CommentsService } from "src/comments/comments.service";

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: MongoRepository<Post>,
        private likesService: LikesService,
        private commentsService: CommentsService,
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

    private mapPostSummary(
        post: Post,
        commentCount: number,
        likeSummary?: LikeSummary,
    ): PostWithSummary {
        return {
            id: post._id.toString(),
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
            userId: post.userId.toString(),
            author: post.author,
            likeCount: likeSummary?.likeCount || 0,
            likedByCurrentUser: likeSummary?.likedByCurrentUser || false,
            commentCount,
        };
    }

    async getPostsWithSummary(
        currentUserId: string,
    ): Promise<PostWithSummary[]> {
        const posts = await this.postsRepository.find();
        if (!posts.length) return [];

        const postIds = posts.map((p) => p._id);

        // Like count + liked by current user
        const likeSummaries = await this.likesService.getLikeSummary(
            EntityType.POST,
            postIds,
            new ObjectId(currentUserId),
        );

        // Comment counts
        const commentCounts =
            await this.commentsService.countCommentsByPostIds(postIds);

        // Merge everything
        return posts.map((p) => {
            const postId = p._id.toString();

            const likeSummary = likeSummaries.find(
                (s) => s.entityId === postId,
            );
            const commentCount = commentCounts.find(
                (c) => c.postId === postId,
            )?.count ?? 0;

            return this.mapPostSummary(p, commentCount, likeSummary);
        });
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
