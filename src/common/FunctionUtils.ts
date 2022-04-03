export async function getOrHandleError(fun: Function, returnIfError: any = null) {
    try {
        return await fun()
    } catch (e) {
        console.error(e)
        return returnIfError
    }
}