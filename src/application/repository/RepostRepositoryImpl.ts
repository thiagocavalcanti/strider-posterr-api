import { dbClient } from "../config/database"
import Repost from "../../business/entities/Repost"
import RepostRepository from "../../business/repository/RepostRepository"
import databaseErrorHandler from "../utils/databaseErrorHandler"


const createImpl = async (repost: Repost) => {
    const client = await dbClient()
    try {
        await client.query("INSERT INTO REPOSTS(user_id, post_id) values($1, $2)", [repost.userId, repost.postId])
    } catch (e) {
        return databaseErrorHandler(client, e, false)
    }
    client.release()
    console.log(`Created repost for userId ${repost.userId} with success`)
    return true
}

const RepostRepositoryImpl: RepostRepository = {
    create: createImpl,
}

export default RepostRepositoryImpl