import { Injectable } from "@nestjs/common";
import { Post } from "./interfaces/post.interface";

@Injectable()
export class PostsService {
    private posts: Post[] = [
        {
            id: 1,
            title: "The fate of Ophelia",
            content: "A lovelorn girl",
            createdAt: new Date(),
        },
        {
            id: 2,
            title: "The fate of Taylor",
            content: "A lovelorn star",
            createdAt: new Date(),
        },
        {
            id: 3,
            title: "The fate of Noah",
            content: "A lovelorn boy",
            createdAt: new Date(),
        },
    ];
    
    getPosts(): Post[] {
        return this.posts;
    }
}
