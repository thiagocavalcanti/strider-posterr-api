import PortRepository from "../../business/repository/PostRepository"
import UserFollower from "../../business/entities/UserFollower"
import UserFollowerRepository from "../../business/repository/UserFollowerRepository"


const createImpl = (userFollower: UserFollower) => null
const deleteImpl = (id: number) => null
const getByFollowingIdAndFollowerIdImpl = (followingUserId: number, followerUserId: number) => null

const UserFollowerRepositoryImpl: UserFollowerRepository = {
    create: createImpl,
    delete: deleteImpl,
    getByFollowingIdAndFollowerId: getByFollowingIdAndFollowerIdImpl
}

export default UserFollowerRepositoryImpl