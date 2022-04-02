import UserFollower from "../entities/UserFollower"

type Create = (userFollower: UserFollower) => Promise<void>
type Delete = (id: number) => Promise<void>
type GetByFollowingIdAndFollowerId = (followingUserId: number, followerUserId: number) => Promise<UserFollower>

export default interface UserFollowerRepository{
    create: Create,
    delete: Delete,
    getByFollowingIdAndFollowerId: GetByFollowingIdAndFollowerId
}