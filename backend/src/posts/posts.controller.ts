import { Controller, Get } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Post as PostInterface } from "./interfaces/post.interface";

@Controller("posts")
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    getPosts() {
        const posts: PostInterface[] = this.postsService.getPosts();
        return posts;
    }
}
