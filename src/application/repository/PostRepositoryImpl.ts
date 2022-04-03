import PortRepository, { OrderBy } from "../../business/repository/PostRepository"
import Post from "../../business/entities/Post"
import { dbClient } from "../config/database"
import { OrderOrientation } from "../../common/CommonTypes"
import Repost from "../../business/entities/Repost"
import Quote from "../../business/entities/Quote"
import PostPagination from "../../business/dto/PostPagination"
import databaseErrorHandler from "../utils/databaseErrorHandler"


const createImpl = async (post: Post) => {
    const client = await dbClient()
    try {
        await client.query("INSERT INTO POSTS(user_id, message) values($1, $2)", [post.userId, post.message])
    } catch (e) {
        return databaseErrorHandler(client, e, false)
    }
    client.release()
    console.log(`Created post for userId ${post.userId} with success`)
    return true
}
const getWithRepostsAndQuotesImpl = async (page: number, pageSize: number, followerUserId?: number, orderOrientation: OrderOrientation = OrderOrientation.desc, orderBy: OrderBy = OrderBy.createdAt): Promise<PostPagination> => {
    const client = await dbClient()
    let response, count
    try {
        response = orderOrientation === OrderOrientation.asc
            ? await client.query("SELECT * from all_posts where $1::text is null or user_id in (select id from user_followers where follower_user_id = $1::int) order by $2 offset $3 limit $4", [followerUserId, orderBy, (page - 1) * pageSize, pageSize])
            : await client.query("SELECT * from all_posts where $1::text is null or user_id in (select id from user_followers where follower_user_id = $1::int) order by $2 desc offset $3 limit $4", [followerUserId, orderBy, (page - 1) * pageSize, pageSize])
        count = Number((await client.query("SELECT count(id) from all_posts where $1::text is null or user_id in (select id from user_followers where follower_user_id = $1::int)", [followerUserId])).rows[0].count)
    } catch (e) {
        return databaseErrorHandler(client, e)
    }

    client.release()
    console.log(`Get all posts with success`)
    const posts = response.rows as Array<Post | Repost | Quote>
    return {
        posts,
        pagination: {
            page,
            pageSize,
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
        }
    }
}
const getWithRepostsAndQuotesByUserIdImpl = async (userId: number, page: number, pageSize: number, orderOrientation: OrderOrientation = OrderOrientation.desc, orderBy: OrderBy = OrderBy.createdAt) => {
    const client = await dbClient()
    let response, count
    try {
        response = orderOrientation === OrderOrientation.asc
            ? await client.query("SELECT * from all_posts where user_id = $1 order by $2 offset $3 limit $4", [userId, orderBy, (page - 1) * pageSize, pageSize])
            : await client.query("SELECT * from all_posts where user_id = $1 order by $2 DESC offset $3 limit $4", [userId, orderBy, (page - 1) * pageSize, pageSize])
        count = await countWithRepostsAndQuotesByUserIdImpl(userId)
    } catch (e) {
        return databaseErrorHandler(client, e)
    }

    client.release()
    console.log(`Get all posts for user ${userId} with success`)
    const posts = response.rows as Array<Post | Repost | Quote>
    return {
        posts,
        pagination: {
            page,
            pageSize,
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
        }
    }
}

const countWithRepostsAndQuotesByUserIdImpl = async (userId: number) => {
    const client = await dbClient()
    let response
    try {
        response = Number((await client.query("SELECT count(id) from all_posts where user_id = $1", [userId])).rows[0].count)
    } catch (e) {
        return databaseErrorHandler(client, e)
    }

    client.release()
    console.log(`Get count of posts for user ${userId} with success`)
    return response
}

const PortRepositoryImpl: PortRepository = {
    create: createImpl,
    getWithRepostsAndQuotes: getWithRepostsAndQuotesImpl,
    getWithRepostsAndQuotesByUserId: getWithRepostsAndQuotesByUserIdImpl,
    countWithRepostsAndQuotesByUserId: countWithRepostsAndQuotesByUserIdImpl
}

export default PortRepositoryImpl