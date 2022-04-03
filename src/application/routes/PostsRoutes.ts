import PostService from "../../business/services/PostService"
import PostRepositoryImpl from "../repository/PostRepositoryImpl"
import QuoteRepositoryImpl from "../repository/QuoteRepositoryImpl"
import RepostRepositoryImpl from "../repository/RepostRepositoryImpl"

export default async (server) => {
    const postService = await new PostService(PostRepositoryImpl, RepostRepositoryImpl, QuoteRepositoryImpl)

    server.get('/v1/posts', async (req, res) => {
        const { page, pageSize, sort, direction, visibility } = req.query
        const userId = visibility === 'all' ? null : Number(req.headers['user-id'])
        const result = await postService.getWithRepostsAndQuotes(Number(page), Number(pageSize), userId, sort, direction)
        result ? res.send(result) : res.status(204).send()
    })
    server.post('/v1/posts', async (req, res) => {
        const userId = req.headers['user-id']
        const result = await postService.createPost({ userId, message: req.body.message })
        result ? res.send() : res.status(400).send()
    })
    server.post('/v1/posts/:id/reposts', async (req, res) => {
        const { id: postId } = req.params
        const userId = req.headers['user-id']
        const result = await postService.createRepost({ userId, postId })
        result ? res.send() : res.status(400).send()
    })
    server.post('/v1/posts/:id/quotes', async (req, res) => {
        const { id: postId } = req.params
        const userId = req.headers['user-id']
        const result = await postService.createQuote({ userId, postId, message: req.body.message })
        result ? res.send() : res.status(400).send()
    })
} 