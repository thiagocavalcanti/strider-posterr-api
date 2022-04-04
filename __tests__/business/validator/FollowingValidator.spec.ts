import UserFollower from "../../../src/business/entities/UserFollower"
import followingValidator from "../../../src/business/validator/FollowingValidator"
import { Validation } from "../../../src/common/CommonTypes"

describe("FollowingValidator", () => {
    test("followingValidator: It should return Validation if followingUserId is missing", () => {
        // given
        const userFollower: UserFollower = { followingUserId: 0, followerUserId: 20}

        // expect
        const result = followingValidator(userFollower)
        expect((result as Validation).errorMessage).toBe("Missing followingUserId")
    })
    test("followingValidator: It should return Validation if followerUserId is missing", () => {
        // given
        const userFollower: UserFollower = { followingUserId: 10, followerUserId: 0}

        // expect
        const result = followingValidator(userFollower)
        expect((result as Validation).errorMessage).toBe("Missing followerUserId")
    })
    test("followingValidator: It should return Validation if followerUserId is the same as followingUserId", () => {
        // given
        const userFollower: UserFollower = { followingUserId: 10, followerUserId: 10}

        // expect
        const result = followingValidator(userFollower)
        expect((result as Validation).errorMessage).toBe("You can't follow yourself")
    })
    test("followingValidator: It should return true if UserFollower is valid", () => {
        // given
        const userFollower: UserFollower = { followingUserId: 10, followerUserId: 20}

        // expect
        const result = followingValidator(userFollower)
        expect(result).toBeTruthy()
    })
})