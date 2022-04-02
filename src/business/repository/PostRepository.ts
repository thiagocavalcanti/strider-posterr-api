import Post from "../entities/Post"
import Repost from "../entities/Repost"
import Quote from "../entities/Quote"
import {OrderOrientation} from "../../common/CommonTypes"

export enum OrderBy{
    createdAt
}

type CreateType = (post: Post) => Promise<void>;
type GetWithRepostsAndQuotesType =  (page: number, pageSize: number, followerUserId?: number, orderOrientation?: OrderOrientation,  orderBy?: OrderBy) => Promise<Array<Post | Repost | Quote>>
type GetWithRepostsAndQuotesByUserId = (userId: number, page: number, pageSize: number, orderOrientation?: OrderOrientation,  orderBy?: OrderBy) => Promise<Array<Post | Repost | Quote>>

export default interface PostRepository{
    create: CreateType;
    getWithRepostsAndQuotes: GetWithRepostsAndQuotesType
    getWithRepostsAndQuotesByUserId: GetWithRepostsAndQuotesByUserId
}