import Repost from "../entities/Repost"

type CreateType = (repost: Repost) => Promise<boolean>;

export default interface RepostRepository {
    create: CreateType;
}