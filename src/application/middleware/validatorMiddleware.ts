import postValidator, { Validation } from "../../business/validator/PostValidator"

export default function postValidatorMiddleware(req, res, next) {
    if (req.method != "POST") next()
    const validation = postValidator(req.body)
    if (validation !== true) {
        res.status(400).send((validation as Validation).errorMessage)
    } else {
        next()
    }
}