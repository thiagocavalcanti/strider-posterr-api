import { getOrHandleError } from "../../common/FunctionUtils";
import FollowerStatistics from "../dto/FollowerStatistics";
import UserFollower from "../entities/UserFollower";
import UserFollowerRepository from "../repository/UserFollowerRepository";

export default class UserFollowerService {
    userFollowerRepository: UserFollowerRepository;

    constructor(userFollowerRepository: UserFollowerRepository) {
        this.userFollowerRepository = userFollowerRepository;
    }

    async getByFollowingIdAndFollowerId(followingUserId: number, followerUserId: number): Promise<UserFollower> {
        return getOrHandleError(async () => await this.userFollowerRepository.getByFollowingIdAndFollowerId(followingUserId, followerUserId));
    }

    async createConnection(userFollower: UserFollower): Promise<boolean> {
        return getOrHandleError(async () => await this.userFollowerRepository.create(userFollower));
    }

    async deleteConnection(id: number): Promise<boolean> {
        return getOrHandleError(async () => await this.userFollowerRepository.delete(id));
    }

    async getUserStatistics(userId: number): Promise<FollowerStatistics> {
        return getOrHandleError(async () => await this.userFollowerRepository.getUserStatistics(userId));
    }
}