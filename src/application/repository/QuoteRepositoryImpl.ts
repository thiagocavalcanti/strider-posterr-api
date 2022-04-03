import { dbClient } from "../config/database"
import QuoteRepository from "../../business/repository/QuoteRepository"
import Quote from "../../business/entities/Quote"
import databaseErrorHandler from "../utils/databaseErrorHandler"


const createImpl = async (quote: Quote) => {
    const client = await dbClient()
    try {
        await client.query("INSERT INTO QUOTES(user_id, message, post_id) values($1, $2, $3)", [quote.userId, quote.message, quote.postId])
    } catch (e) {
        return databaseErrorHandler(client, e, false)
    }

    client.release()
    console.log(`Created quote for userId ${quote.userId} with success`)
    return true
}

const QuoteRepositoryImpl: QuoteRepository = {
    create: createImpl,
}

export default QuoteRepositoryImpl