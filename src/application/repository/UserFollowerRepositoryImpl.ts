import FollowerStatistics from "../../business/dto/FollowerStatistics"
import UserFollower from "../../business/entities/UserFollower"
import UserFollowerRepository from "../../business/repository/UserFollowerRepository"
import { dbClient } from "../config/database"
import databaseErrorHandler from "../utils/databaseErrorHandler"


const createImpl = async (userFollower: UserFollower) => {
    const client = await dbClient()
    try {
        await client.query("INSERT INTO user_followers(following_user_id, follower_user_id) values($1, $2)", [userFollower.followingUserId, userFollower.followerUserId])
    } catch (e) {
        return databaseErrorHandler(client, e, false)
    }

    client.release()
    console.log(`Created follow link between following user ${userFollower.followingUserId} with follower ${userFollower.followerUserId} with success`)
    return true
}
const deleteImpl = async (id: number) => {
    const client = await dbClient()
    try {
        await client.query("delete from user_followers where id = $1", [id])
    } catch (e) {
        return databaseErrorHandler(client, e, false)
    }

    client.release()
    console.log(`Deleted link ${id} with success`)
    return true
}
const getByFollowingIdAndFollowerIdImpl = async (followingUserId: number, followerUserId: number) => {
    const client = await dbClient()
    let response
    try {
        response = await client.query("SELECT * FROM USER_FOLLOWERS WHERE FOLLOWING_USER_ID = $1 AND FOLLOWER_USER_ID = $2", [followingUserId, followerUserId])
    } catch (e) {
        return databaseErrorHandler(client, e)
    }

    client.release()
    console.log(`Get link between following user ${followingUserId} and follower ${followerUserId} with success`)
    return response.rows[0] as UserFollower
}
const getUserStatisticsImpl = async (userId: number) => {
    const client = await dbClient()
    let followingAmount, followersAmount
    try {
        followersAmount = Number((await client.query("SELECT count(id) FROM USER_FOLLOWERS WHERE FOLLOWER_USER_ID = $1", [userId])).rows[0].count)
        followingAmount = Number((await client.query("SELECT count(id) FROM USER_FOLLOWERS WHERE FOLLOWING_USER_ID = $1", [userId])).rows[0].count)
    } catch (e) {
        return databaseErrorHandler(client, e)
    }

    client.release()
    return { followingAmount, followersAmount } as FollowerStatistics
}

const UserFollowerRepositoryImpl: UserFollowerRepository = {
    create: createImpl,
    delete: deleteImpl,
    getByFollowingIdAndFollowerId: getByFollowingIdAndFollowerIdImpl,
    getUserStatistics: getUserStatisticsImpl
}

export default UserFollowerRepositoryImpl