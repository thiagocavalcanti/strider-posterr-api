import UserFollower from "../entities/UserFollower"

type Create = (userFollower: UserFollower) => void
type Delete = (id: number) => void
type GetByFollowingIdAndFollowerId = (followingUserId: number, followerUserId: number) => UserFollower

export interface UserRepository{
    create: Create,
    delete: Delete,
    getByFollowingIdAndFollowerId: GetByFollowingIdAndFollowerId
}