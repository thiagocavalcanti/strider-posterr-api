import UserRepository from "../../business/repository/UserRepository"
import User from "../../business/entities/User"
import _, { dbClient } from "../config/database"
import databaseErrorHandler from "../utils/databaseErrorHandler"
import { dateToUserFriendly } from "../utils/dateFormatter"

const getByIdImpl = async (id: number) => {
    const client = await dbClient()
    let response
    try {
        response = await client.query("SELECT * FROM users where id = $1", [id])
    } catch (e) {
        return databaseErrorHandler(client, e, false)
    }

    client.release()
    console.log(`Get user with id ${id} with success`)
    return response.rows
        ? { id: response.rows[0].id, username: response.rows[0].username, createdAt: dateToUserFriendly(response.rows[0]['created_at']) } as User
        : null
}


const UserRepositoryImpl: UserRepository = {
    getById: getByIdImpl
}

export default UserRepositoryImpl