import PortRepository, { OrderBy } from "../../business/repository/PostRepository"
import Post from "../../business/entities/Post"
import { dbClient } from "../config/database"
import { OrderOrientation } from "../../common/CommonTypes"
import Repost from "../../business/entities/Repost"
import Quote from "../../business/entities/Quote"


const createImpl = async (post: Post) => {
    const client = await dbClient()
    try {
        await client.query("INSERT INTO POSTS(user_id, message) values($1, $2)", [post.userId, post.message])
    } finally {
        client.release()
        console.log(`Created post for userId ${post.userId} with success`)
    }
}
const getWithRepostsAndQuotesImpl = async (page: number, pageSize: number, followerUserId?: number, orderOrientation: OrderOrientation = OrderOrientation.desc, orderBy: OrderBy = OrderBy.createdAt) => {
    const client = await dbClient()
    let response
    try {
        response = orderOrientation === OrderOrientation.asc
            ? await client.query("SELECT * from all_posts where $1 is null or user_id in (select id from user_followers where follower_user_id = $1) order by $2 offset $3 limit $4", [followerUserId, orderBy, (page - 1) * pageSize, pageSize])
            : await client.query("SELECT * from all_posts where $1 is null or user_id in (select id from user_followers where follower_user_id = $1) order by $2 desc offset $3 limit $4", [followerUserId, orderBy, (page - 1) * pageSize, pageSize])
    } finally {
        client.release()
        console.log(`Get all posts for user ${followerUserId} with success`)
    }
    return response.rows as Array<Post | Repost | Quote>
}
const getWithRepostsAndQuotesByUserIdImpl = async (userId: number, page: number, pageSize: number, orderOrientation: OrderOrientation = OrderOrientation.desc, orderBy: OrderBy = OrderBy.createdAt) => {
    const client = await dbClient()
    let response
    try {
        response = orderOrientation === OrderOrientation.asc
            ? await client.query("SELECT * from all_posts where user_id = $1 order by $2 offset $3 limit $4", [userId, orderBy, (page - 1) * pageSize, pageSize])
            : await client.query("SELECT * from all_posts where user_id = $1 order by $2 DESC offset $3 limit $4", [userId, orderBy, (page - 1) * pageSize, pageSize])
    } finally {
        client.release()
        console.log(`Get all posts for user ${userId} with success`)
    }
    return response.rows as Array<Post | Repost | Quote>
}

const PortRepositoryImpl: PortRepository = {
    create: createImpl,
    getWithRepostsAndQuotes: getWithRepostsAndQuotesImpl,
    getWithRepostsAndQuotesByUserId: getWithRepostsAndQuotesByUserIdImpl
}

export default PortRepositoryImpl