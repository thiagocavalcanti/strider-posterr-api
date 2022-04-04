import Post from "../../../src/business/entities/Post"
import postValidator from "../../../src/business/validator/PostValidator"
import { Validation } from "../../../src/common/CommonTypes"

describe("PostValidator", () => {
    test("postValidator: It should return Validation if message is empty", () => {
        // given
        const post: Post = { userId: 1, message: ""}

        // expect
        const result = postValidator(post)
        expect((result as Validation).errorMessage).toBe("Message can't be empty")
    })
    test("postValidator: It should return Validation if message has more then 777 characters", () => {
        // given
        const post: Post = { userId: 1, message: "teste com 39 ho3ghuo3g1o3uy1g31yogoy31=teste com 39 ho3ghuo3g1o3uy1g31yogoy31=teste com 39 ho3ghuo3g1o3uy1g31yogoy31=teste com 39 ho3ghuo3g1o3uy1g31yogoy31=teste com 39 ho3ghuo3g1o3uy1g31yogoy31=teste com 39 ho3ghuo3g1o3uy1g31yogoy31=teste com 39 ho3ghuo3g1o3uy1g31yogoy31=teste com 39 ho3ghuo3g1o3uy1g31yogoy31=teste com 39 ho3ghuo3g1o3uy1g31yogoy31=teste coam 39 ho3ghuo3g1o3uy1g31yogoy31=teste com 39 ho3ghuo3g1o3uy1g31yogoy31=teste com 39 ho3ghuo3g1o3uy1g31yogoy31=teste com 39 ho3ghuo3g1o3uy1g31yogoy31=teste com 39 ho3ghuo3g1o3uy1g31yogoy31=teste com 39 ho3ghuo3g1o3uy1g31yogoy31=teste com 39 ho3ghuo3g1o3uy1g31yogoy31=teste com 39 ho3ghuo3g1o3uy1g31yogoy31=teste com 39 ho3ghuo3g1o3uy1g31yogoy31=teste com 39 ho3ghuo3g1o3uy1g31yogoy31=teste com 39 ho3ghuo3g1o3uy1g31yogoy"}

        // expect
        const result = postValidator(post)
        expect((result as Validation).errorMessage).toBe("Message can't exceed 777 characters")
    })
    test("postValidator: It should return true if Post is valid", () => {
        // given
        const post: Post = { userId: 1, message: "I love sushi!"}

        // expect
        const result = postValidator(post)
        expect(result).toBeTruthy()
    })
})