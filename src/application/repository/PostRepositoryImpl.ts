import PortRepository from "../../business/repository/PostRepository"
import Post from "../../business/entities/Post"


const createImpl = (post: Post) => null
const getWithRepostsAndQuotesImpl = (page: number, pageSize: number, followerUserId?: number) => []

const PortRepositoryImpl: PortRepository = {
    create: createImpl,
    getWithRepostsAndQuotes: getWithRepostsAndQuotesImpl
}

export default PortRepositoryImpl