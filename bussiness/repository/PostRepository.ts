import Post from "../entities/Post"
import Repost from "../entities/Repost"
import Quote from "../entities/Quote"

type Create = (post: Post) => void;
type GetWithRepostsAndQuotes =  (page: number, pageSize: number, followerUserId?: number) => Array<Post | Repost | Quote>

export interface PostRepository{
    create: Create;
    getWithRepostsAndQuotes: GetWithRepostsAndQuotes
}