import UserService from "../../business/services/UserService"
import PostService from "../../business/services/PostService"
import UserFollowerService from "../../business/services/UserFollowerService"
import PostRepositoryImpl from "../repository/PostRepositoryImpl"
import UserRepositoryImpl from "../repository/UserRepositoryImpl"
import RepostRepositoryImpl from "../repository/RepostRepositoryImpl"
import QuoteRepositoryImpl from "../repository/QuoteRepositoryImpl"
import UserFollowerRepositoryImpl from "../repository/UserFollowerRepositoryImpl"

export default async (server) => {
    const userService = await new UserService(UserRepositoryImpl, PostRepositoryImpl, UserFollowerRepositoryImpl)
    const postService = await new PostService(PostRepositoryImpl, RepostRepositoryImpl, QuoteRepositoryImpl)
    const userFollowerService = await new UserFollowerService(UserFollowerRepositoryImpl)

    server.get('/v1/users/:id', async (req, res) => {
        const { id } = req.params
        const result = await userService.getBydId(id)
        result ? res.send(result) : res.status(204).send()
    })
    server.get('/v1/users/:id/posts', async (req, res) => {
        const { id } = req.params
        const { page, pageSize, sort, direction } = req.query
        const result = await postService.getByUserIdWithRepostAndQuotes(id, Number(page), Number(pageSize), sort, direction)
        res.send(result)
    })
    server.get('/v1/users/:id/followers', async (req, res) => {
        const { id } = req.params
        const { followingUserId } = req.query
        const result = await userFollowerService.getByFollowingIdAndFollowerId(followingUserId, id)
        result ? res.send(result) : res.status(204).send(result)
    })
    server.post('/v1/users/:id/followers', async (req, res) => {
        const { id } = req.params
        const { followingUserId } = req.query
        const result = await userFollowerService.createConnection({ followingUserId: followingUserId, followerUserId: id })
        result ? res.send() : res.status(400).send()
    })
    server.delete('/v1/users/:id/followers/:followingId', async (req, res) => {
        const { followingId } = req.params
        const result = await userFollowerService.deleteConnection(followingId)
        result ? res.send() : res.status(400).send()
    })
} 