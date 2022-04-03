import FollowerStatistics from "../dto/FollowerStatistics"
import UserFollower from "../entities/UserFollower"

type Create = (userFollower: UserFollower) => Promise<boolean>
type Delete = (id: number) => Promise<boolean>
type GetByFollowingIdAndFollowerId = (followingUserId: number, followerUserId: number) => Promise<UserFollower>
type GetUserStatistics = (userId: number) => Promise<FollowerStatistics>

export default interface UserFollowerRepository {
    create: Create,
    delete: Delete,
    getByFollowingIdAndFollowerId: GetByFollowingIdAndFollowerId
    getUserStatistics: GetUserStatistics
}