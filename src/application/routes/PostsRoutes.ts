export default (server) => {
    server.get('/v1/posts', (req, res) => {
        const { page, pageSize, sort, direction, visibility} = req.query
        console.log(req.query)
        res.send()
    })
    server.post('/v1/posts', (req, res) => {
        console.log(req.body)
        res.send()
    })
    server.post('/v1/posts/:id/reposts', (req, res) => {
        const { id } = req.params
        console.log(req.params, req.body)
        res.send()
    })
    server.post('/v1/posts/:id/quotes', (req, res) => {
        const { id } = req.params
        console.log(req.params, req.body)
        res.send()
    })
} 