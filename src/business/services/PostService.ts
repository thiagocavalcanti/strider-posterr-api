import { OrderOrientation } from "../../common/CommonTypes";
import { getOrHandleError } from "../../common/FunctionUtils";
import PostPagination from "../dto/PostPagination";
import Post from "../entities/Post";
import Quote from "../entities/Quote";
import Repost from "../entities/Repost";
import PostRepository, { OrderBy } from "../repository/PostRepository";
import QuoteRepository from "../repository/QuoteRepository";
import RepostRepository from "../repository/RepostRepository";

export default class PostService {
    postRepository: PostRepository;
    repostRepository: RepostRepository;
    quoteRepository: QuoteRepository;

    constructor(postRepository: PostRepository, repostRepository: RepostRepository, quoteRepository: QuoteRepository) {
        this.postRepository = postRepository;
        this.repostRepository = repostRepository;
        this.quoteRepository = quoteRepository;
    }

    async getWithRepostsAndQuotes(page: number, pageSize: number, followerUserId?: number, direction: OrderOrientation = OrderOrientation.desc, sort: OrderBy = OrderBy.createdAt): Promise<PostPagination> {
        return getOrHandleError(async () => await this.postRepository.getWithRepostsAndQuotes(page, pageSize, followerUserId, direction, sort));
    }

    async getByUserIdWithRepostAndQuotes(userId: number, page: number, pageSize: number, direction: OrderOrientation = OrderOrientation.desc, sort: OrderBy = OrderBy.createdAt): Promise<PostPagination> {
        return getOrHandleError(async () => await this.postRepository.getWithRepostsAndQuotesByUserId(userId, page, pageSize, direction, sort));
    }

    async createPost(post: Post): Promise<boolean> {
        return getOrHandleError(async () => await this.postRepository.create(post))
    }

    async createRepost(repost: Repost): Promise<boolean> {
        return getOrHandleError(async () => await this.repostRepository.create(repost))
    }

    async createQuote(quote: Quote): Promise<boolean> {
        return getOrHandleError(async () => await this.quoteRepository.create(quote))
    }
}