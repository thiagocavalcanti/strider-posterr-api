import UserRepository from "../repository/UserRepository";
import PostRepository from "../repository/PostRepository";
import User from "../entities/User";
import { getOrHandleError } from "../../common/FunctionUtils";
import UserProfile from "../dto/UserProfile";
import UserFollowerRepository from "../repository/UserFollowerRepository";
import FollowerStatistics from "../dto/FollowerStatistics";

export default class UserService {
    userRepository: UserRepository
    postRepository: PostRepository;
    userFollowerRepository: UserFollowerRepository;

    constructor(userRepository: UserRepository, postRepository: PostRepository, userFollowerRepository: UserFollowerRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.userFollowerRepository = userFollowerRepository;
    }

    async getBydId(id: number): Promise<UserProfile> {
        const user: User = await getOrHandleError(async () => await this.userRepository.getById(id));
        if (!user) return null
        const userFollowerStatistics: FollowerStatistics = await getOrHandleError(async () => await this.userFollowerRepository.getUserStatistics(id))
        console.log(userFollowerStatistics)
        if (!userFollowerStatistics) return null
        const postsAmount: number = await getOrHandleError(async () => await this.postRepository.countWithRepostsAndQuotesByUserId(id))
        return { ...user, statistics: { ...userFollowerStatistics, postsAmount } } as UserProfile
    }
}