export async function getOrHandleError(fun: Function, returnIfError: any = null) {
    try {
        return await fun()
    } catch (e) {
        console.log(e)
        return returnIfError
    }
}