import Post from "../entities/Post";
import Quote from "../entities/Quote";
import Repost from "../entities/Repost";

interface Pagination {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
}

export default interface PostPagination {
    posts: Array<Post | Repost | Quote>
    pagination: Pagination
}