import User from "../entities/User";
import FollowerStatistics from "./FollowerStatistics";

interface UserStatistics extends FollowerStatistics {
    postsAmount: number
}

export default interface UserProfile extends User {
    statistics: UserStatistics
}