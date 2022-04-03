import { Validation } from "../../common/CommonTypes";
import UserFollower from "../entities/UserFollower";

export default function followingValidator(userFollower: UserFollower): Validation | boolean {
    if (!userFollower.followerUserId) {
        return { field: "followerUserId", errorMessage: "Missing followerUserId" };
    }
    if (!userFollower.followingUserId) {
        return { field: "followingUserId", errorMessage: "Missing followingUserId" };
    }
    if (userFollower.followingUserId === userFollower.followerUserId) {
        return { field: "followingUserId", errorMessage: "You can't follow yourself" };
    }
    return true
}