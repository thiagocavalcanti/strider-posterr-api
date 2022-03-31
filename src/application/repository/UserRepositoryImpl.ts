import PortRepository from "../../business/repository/PostRepository"
import Post from "../../business/entities/Post"
import UserRepository, { OrderBy } from "../../business/repository/UserRepository"
import { OrderOrientation } from "../../common/CommonTypes"


const getByIdImpl = (id: number) => null
const getPostsById = (id: number, page: number, pageSize: number, orderOrientation: OrderOrientation,  orderBy: OrderBy) => []

const UserRepositoryImpl: UserRepository = {
    getById: getByIdImpl
    getPostsById: getPostsById
}

export default UserRepositoryImpl