import { Validation } from "../../common/CommonTypes";
import Post from "../entities/Post";

export default function postValidator(post: Post): Validation | boolean {
    if (!post.message || post.message === '') {
        return { field: "message", errorMessage: "Message can't be empty" };
    }
    if (post.message.length > 777) {
        return { field: "message", errorMessage: "Message can't exceed 777 characters" };
    }
    return true
}