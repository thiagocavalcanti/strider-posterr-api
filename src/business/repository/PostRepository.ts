import Post from "../entities/Post"
import { OrderOrientation } from "../../common/CommonTypes"
import PostPagination from "../dto/PostPagination";

export enum OrderBy {
    createdAt
}

type CreateType = (post: Post) => Promise<boolean>;
type GetWithRepostsAndQuotesType = (page: number, pageSize: number, followerUserId?: number, orderOrientation?: OrderOrientation, orderBy?: OrderBy) => Promise<PostPagination>
type GetWithRepostsAndQuotesByUserId = (userId: number, page: number, pageSize: number, orderOrientation?: OrderOrientation, orderBy?: OrderBy) => Promise<PostPagination>
type CountWithRepostsAndQuotesByUserId = (userId: number) => Promise<number>

export default interface PostRepository {
    create: CreateType;
    getWithRepostsAndQuotes: GetWithRepostsAndQuotesType
    getWithRepostsAndQuotesByUserId: GetWithRepostsAndQuotesByUserId
    countWithRepostsAndQuotesByUserId: CountWithRepostsAndQuotesByUserId
}