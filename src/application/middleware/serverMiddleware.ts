export default function (req, res, next) {
    if(!req.headers['user-id']){
        res.status(401).send("Missing user-id header")
    } else {
        next()
    }
}