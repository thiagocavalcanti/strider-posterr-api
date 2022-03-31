import User from "../entities/User"
import Post from "../entities/Post"
import {OrderOrientation} from "../../common/CommonTypes"

enum OrderBy{
    createdAt
}

type GetById = (id: number) => User
type GetPostsById = (id: number, page: number, pageSize: number, orderOrientation: OrderOrientation,  orderBy: OrderBy) => Post[]

export interface UserRepository{
    getById: GetById
    getPostsById: GetPostsById
}