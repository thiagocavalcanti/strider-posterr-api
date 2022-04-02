export default (server) => {
    server.get('/v1/users/:id', (req, res) => {
        const { id } = req.params
        console.log(req.params)
        res.send()
    })
    server.get('/v1/users/:id/posts', (req, res) => {
        const { id } = req.params
        const { page, pageSize, sort, direction } = req.query
        console.log(req.params, req.query)
        res.send()
    })
    server.get('/v1/users/:id/followers/:followingId', (req, res) => {
        const { id, followingId } = req.params
        console.log(req.params)
        res.send()
    })
    server.post('/v1/users/:id/followers', (req, res) => {
        const { id } = req.params
        console.log(req.params)
        res.send()
    })
    server.delete('/v1/users/:id/followers/:followingId', (req, res) => {
        const { id, followingId } = req.params
        console.log(req.params)
        res.send()
    })
} 