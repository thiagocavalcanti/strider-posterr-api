import { getTodayAtBeginning } from "../../src/common/DateUtils"

describe("DateUtils", () => {
    test("getTodayAtBeginning: It should return today at the beginning of the day", () => {
        const today = new Date()
        
        // then
        const response = getTodayAtBeginning()
        expect(response.getUTCDay()).toEqual(today.getUTCDay())
        expect(response.getUTCMonth()).toEqual(today.getUTCMonth())
        expect(response.getUTCFullYear()).toEqual(today.getUTCFullYear())
        expect(response.getUTCHours()).toEqual(0)
        expect(response.getUTCMinutes()).toEqual(0)
        expect(response.getUTCSeconds()).toEqual(0)
        expect(response.getUTCMilliseconds()).toEqual(0)
    })
})