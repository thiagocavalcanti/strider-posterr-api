export default function databaseErrorHandler(client: any, err: any, returnIfError: any = null) {
    console.error(`Database error: ${err.message}`)
    client.release()
    return returnIfError
}