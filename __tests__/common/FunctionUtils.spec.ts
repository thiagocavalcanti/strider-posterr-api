import { getOrHandleError } from "../../src/common/FunctionUtils";

describe("FunctionUtils", () => {
    test("getOrHandleError: It should return result of the function in the first argument if function did not throw exception", async () => {
        // given
        const expectedResult = 1
        const mockedFunction = jest.fn(async () => expectedResult)

        // then
        const result = await getOrHandleError(mockedFunction)
        expect(result).toEqual(expectedResult);
    })
    test("getOrHandleError: It should return null if function throws exception and the second argument is undefined", async () => {
        // given
        const mockedFunction = jest.fn(async () => { throw new Error("") })

        // then
        const result = await getOrHandleError(mockedFunction)
        expect(result).toBeNull();
    })
    test("getOrHandleError: It should return the second param if function throws exception", async () => {
        // given
        const expectedResult = 83196391
        const mockedFunction = jest.fn(async () => { throw new Error("") })

        // then
        const result = await getOrHandleError(mockedFunction, expectedResult)
        expect(result).toEqual(expectedResult);
    })
})