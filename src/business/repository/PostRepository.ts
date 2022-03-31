import Post from "../entities/Post"
import Repost from "../entities/Repost"
import Quote from "../entities/Quote"

type CreateType = (post: Post) => void;
type GetWithRepostsAndQuotesType =  (page: number, pageSize: number, followerUserId?: number) => Array<Post | Repost | Quote>

export default interface PostRepository{
    create: CreateType;
    getWithRepostsAndQuotes: GetWithRepostsAndQuotesType
}