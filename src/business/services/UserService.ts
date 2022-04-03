import UserRepository from "../repository/UserRepository";
import User from "../entities/User";
import { getOrHandleError } from "../../common/FunctionUtils";
import UserProfile from "../dto/UserProfile";
import FollowerStatistics from "../dto/FollowerStatistics";
import PostService from "./PostService";
import UserFollowerService from "./UserFollowerService";

export default class UserService {
    userRepository: UserRepository
    postService: PostService;
    userFollowerService: UserFollowerService;

    constructor(userRepository: UserRepository, postService: PostService, userFollowerService: UserFollowerService) {
        this.userRepository = userRepository;
        this.postService = postService;
        this.userFollowerService = userFollowerService;
    }

    async getBydId(id: number): Promise<UserProfile> {
        const user: User = await getOrHandleError(async () => await this.userRepository.getById(id));
        if (!user) return null
        const userFollowerStatistics: FollowerStatistics = await getOrHandleError(async () => await this.userFollowerService.getUserStatistics(id))
        if (!userFollowerStatistics) return null
        const postsAmount: number = await getOrHandleError(async () => await this.postService.countWithRepostsAndQuotesByUserId(id))
        return { ...user, statistics: { ...userFollowerStatistics, postsAmount } } as UserProfile
    }
}