import UserFollower from "../../business/entities/UserFollower"
import UserFollowerRepository from "../../business/repository/UserFollowerRepository"
import { dbClient } from "../config/database"


const createImpl = async (userFollower: UserFollower) => {
    const client = await dbClient()
    try {
        await client.query("INSERT INTO user_followers(followingUserId, follower_user_id) values($1, $2)", [userFollower.followingUserId, userFollower.followerUserId])
    } finally {
        client.release()
        console.log(`Created follow link between following user ${userFollower.followingUserId} with follower ${userFollower.followerUserId} with success`)
    }
}
const deleteImpl = async (id: number) => {
    const client = await dbClient()
    try {
        await client.query("delete from user_followers where id = $1", [id])
    } finally {
        client.release()
        console.log(`Deleted link ${id} with success`)
    }
}
const getByFollowingIdAndFollowerIdImpl = async (followingUserId: number, followerUserId: number) => {
    const client = await dbClient()
    let response
    try{
        response = await dbClient().query("SELECT * FROM USER_FOLLOWERS WHERE FOLLOWING_USER_ID = $1 AND FOLLOWER_USER_ID = $2", [followingUserId, followerUserId])
    } finally{
        client.release()
        console.log(`Get link between following user ${followingUserId} and follower ${followerUserId} with success`)
    }
    return response.rows[0] as UserFollower 
}

const UserFollowerRepositoryImpl: UserFollowerRepository = {
    create: createImpl,
    delete: deleteImpl,
    getByFollowingIdAndFollowerId: getByFollowingIdAndFollowerIdImpl
}

export default UserFollowerRepositoryImpl