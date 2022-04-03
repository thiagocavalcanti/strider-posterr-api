import followingValidator from "../../business/validator/FollowingValidator"
import postValidator from "../../business/validator/PostValidator"
import { Validation } from "../../common/CommonTypes"

export function postValidatorMiddleware(req, res, next) {
    if (req.method != "POST") return next()
    const validation = postValidator(req.body)
    if (validation !== true) {
        res.status(400).send((validation as Validation).errorMessage)
    } else {
        next()
    }
}

export function followingValidatorMiddleware(req, res, next) {
    if (req.method != "POST") return next()
    const validation = followingValidator(req.body)
    if (validation !== true) {
        res.status(400).send((validation as Validation).errorMessage)
    } else {
        next()
    }
}