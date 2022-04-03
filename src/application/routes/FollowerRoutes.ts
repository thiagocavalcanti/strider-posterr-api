import UserFollowerService from "../../business/services/UserFollowerService"
import UserFollowerRepositoryImpl from "../repository/UserFollowerRepositoryImpl"

export default async (server) => {
    const userFollowerService = await new UserFollowerService(UserFollowerRepositoryImpl)

    server.get('/v1/followers', async (req, res) => {
        const { followingUserId, followerUserId } = req.query
        const result = await userFollowerService.getByFollowingIdAndFollowerId(followingUserId, followerUserId)
        result ? res.send(result) : res.status(204).send(result)
    })
    server.post('/v1/followers', async (req, res) => {
        const { followingUserId, followerUserId } = req.body
        const result = await userFollowerService.createConnection({ followingUserId, followerUserId })
        result ? res.send() : res.status(400).send()
    })
    server.delete('/v1/followers/:id', async (req, res) => {
        const { id } = req.params
        const result = await userFollowerService.deleteConnection(id)
        result ? res.send() : res.status(400).send()
    })
} 